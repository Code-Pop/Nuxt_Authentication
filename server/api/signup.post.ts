import { createUser } from '@/utils/db'

interface Params { username?: string, password?: string }

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody<Params>(event)
  if (typeof username === 'string' && typeof password === 'string') {
    if (username.length >= 1) {
      if (password.length >= 10) {
        const isCreated = await createUser(username, password)
        if (isCreated) {
          return { error: null }
        }
      } else {
        return { error: 'password too short' }
      }
    } else {
      return { error: 'username empty' }
    }
  }
  return { error: 'sign up failed' }
})
