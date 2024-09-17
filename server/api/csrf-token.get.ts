import { getCsrfToken } from "@/utils/db"

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  return { csrfToken: getCsrfToken(session.userId) }
})
