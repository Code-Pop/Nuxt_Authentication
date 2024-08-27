import Database from 'better-sqlite3'
import cryptoRandomString from 'crypto-random-string'
import bcrypt from 'bcrypt'

export const db = new Database('db.sqlite')

export const createSession = (username: string) => {
  const sessionToken = cryptoRandomString({length: 21, type: 'base64'})
  const csrfToken = cryptoRandomString({length: 21, type: 'base64'})
  const user = db
    .prepare<string, { id: string }>(
      'SELECT id FROM users WHERE username=?'
    )
    .get(username)
  if (user) {
    const info = db
      .prepare('UPDATE users SET sessionToken=?, csrfToken=? WHERE id=?')
      .run(sessionToken, csrfToken, user.id)
    if (info.changes === 1) {
      return { sessionToken, userId: user.id }
    }
  }
}

export const createUser = async (username: string, password: string) => {
  const id = cryptoRandomString({length: 21, type: 'base64'})
  const passwordHash = await bcrypt.hash(password, 10)
  try {
    const info = db
      .prepare('INSERT INTO users (id, username, passwordHash, sessionToken, csrfToken) VALUES (?, ?, ?, NULL, NULL)')
      .run(id, username, passwordHash)
    return info.changes === 1
  } catch {
    return false
  }
}

export const deleteSession = (userId: string) => {
  db
    .prepare('UPDATE users SET sessionToken=NULL, csrfToken=NULL WHERE id=?')
    .run(userId)
}

export const verifyPassword = async (username: string, password: string) => {
  const result = db
    .prepare<[string], { passwordHash: string }>(
      'SELECT passwordHash FROM users WHERE username=?'
    )
    .get(username)
  if (result !== undefined) {
    return await bcrypt.compare(password, result.passwordHash)
  }
  return false
}

export const verifySession = (userId: string, sessionToken: string) => {
  const result = db
    .prepare<[string, string], { id: string }>(
      'SELECT id FROM users WHERE id=? AND sessionToken=?'
    )
    .get(userId, sessionToken)
  return result !== undefined && result.id === userId
}


export const getPostsByUser = (userId: string) => {
  const result = db
    .prepare<[string], { id: string, content: string }>(
      `SELECT id, content FROM posts WHERE userId=?`
    )
    .all(userId)
  return Array.isArray(result) ? result : []
}

export const createPost = (userId: string, content: string) => {
  const id = cryptoRandomString({length: 21, type: 'base64'})
  const info = db
    .prepare('INSERT INTO posts (id, content, userId) VALUES (?, ?, ?)')
    .run(id, content, userId)
  return info.changes === 1
}

export const getCsrfToken = (userId: string) => {
  const result = db
    .prepare<[string], { csrfToken: string }>(
      `SELECT csrfToken FROM users WHERE id=?`
    )
    .get(userId)
  return result?.csrfToken
}

export const verifyCsrfToken = (userId: string, token: string) => {
  const result = db
    .prepare<[string], { csrfToken: string }>(
      `SELECT csrfToken FROM users WHERE id=?`
    )
    .get(userId)
  return result !== undefined ? result.csrfToken === token : false
}
