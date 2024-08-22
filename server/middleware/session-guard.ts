import { verifySession } from '@/utils/db'

const publicRoutes = [
  '/',
  '/login',
  '/signup',
  '/api/login',
  '/api/signup'
]

const privateRoutes = [
  '/dashboard GET',
  '/api/private-data GET',
  '/api/_auth/session GET',
  '/api/_auth/session DELETE'
]

export default defineEventHandler(async (event) => {
  if (!publicRoutes.includes(event.path)) {
    if (privateRoutes.includes(event.path + ' ' + event.method)) {
      try {
        const session = await requireUserSession(event)
        if (!verifySession(session.userId, session.token)) {
          throw createError({ status: 401 })
        }
        if (event.path === '/api/_auth/session' && event.method === 'GET') {
          await sendWebResponse(event, Response.json({ user: session.user }))
        }
      } catch (error) {
        setCookie(event, 'nuxt-session', '')
        if (event.path.startsWith('/api/')) {
          throw error
        } else {
          await sendRedirect(event, '/login')
        }
      }
    } else {
      throw createError({ status: 404 })
    }
  }
})
