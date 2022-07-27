import { PostModel } from "./post"
import * as z from "zod"

export type Post = z.infer<typeof PostModel>
