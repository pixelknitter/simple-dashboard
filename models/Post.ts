import { z } from "zod"

export const PostSchema = z.object({
  author: z
    .string({
      required_error: "Author is required",
      invalid_type_error: "Author must be a string",
    })
    .trim()
    .min(1, { message: "Cannot be empty" }),
  body: z
    .string({
      required_error: "Comment is required",
      invalid_type_error: "Comment must be a string",
    })
    .trim()
    .min(1, { message: "Cannot be empty" }),
})

// extract the inferred type
export type Post = z.infer<typeof PostSchema>
// { username: string }
