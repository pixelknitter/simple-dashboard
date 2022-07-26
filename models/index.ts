import { PostModel } from "./Post"
import * as z from "zod"

export type Post = z.infer<typeof PostModel>
