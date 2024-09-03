const publicRoutes = [
  '/',
  '/login',
  '/signup'
]

let isFirst = true

export default defineNuxtRouteMiddleware(async (to) => {
  if (!publicRoutes.includes(to.path) && window && !isFirst) {
    const { loggedIn, fetch } = useUserSession()
    await fetch()
    if (loggedIn.value === false) {
      window.location.href = '/login'
      return abortNavigation()
    }
  } else {
    isFirst = false
  }
})
