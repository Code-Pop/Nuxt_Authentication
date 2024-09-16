import { getPostsByUser } from "@/utils/db"

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  return getPostsByUser(session.userId)
})
