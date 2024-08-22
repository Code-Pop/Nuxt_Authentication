import { createSession, verifyPassword } from '@/utils/db'

interface Params { username?: string, password?: string }

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody<Params>(event)
  if (typeof username === 'string' && typeof password === 'string') {
    if (username.length >= 1 && password.length >= 10) {
      const isValidPassword = await verifyPassword(username, password)
      if (isValidPassword) {
        const result = createSession(username)
        if (result !== undefined) {
          await setUserSession(event, {
            user: {
              username,
            },
            userId: result.userId,
            token: result.sessionToken
          })
          return { error: null }
        }
      }
    }
  }
  return { error: 'login failed' }
})
