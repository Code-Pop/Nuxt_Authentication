import { createPost } from "@/utils/db"

interface Params { content?: string }

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const { content } = await readBody<Params>(event)
  if (typeof content === 'string' && content.length > 0) {
    if(createPost(session.userId, content)) {
      return { error: null }
    }
  }
  return { error: 'create post failed' }
})
