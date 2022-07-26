import * as z from "zod"

export const PostModel = z.object({
  id: z.number().int(),
  author: z.string().trim().min(1, { message: "Cannot be empty" }),
  body: z.string().trim().min(1, { message: "Cannot be empty" }),
})
