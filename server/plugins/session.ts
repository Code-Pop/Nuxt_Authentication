import { deleteSession } from '@/utils/db'

export default defineNitroPlugin(() => {
  sessionHooks.hook('clear', (session) => {
    deleteSession(session.userId)
  })
})
