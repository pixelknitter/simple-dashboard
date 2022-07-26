// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { JSONResponse } from "../../helpers/FetchUtils"
import { Post } from "../../models"
import prisma from "../../prisma/db"

// Implement rest endpoints for getting, creating, and posting 'posts'.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JSONResponse<Post[]>>
) {
  if (req.method === "POST") {
    const { author, body } = req.body
    try {
      await prisma.post.create({
        data: {
          author,
          body,
        },
      })
      // return the updated posts
      const posts = await prisma.post.findMany()
      return res.json({ data: posts })
    } catch (error: any) {
      return res.status(500).json({ errors: [error?.message] })
    }
  }
  if (req.method === "GET") {
    try {
      const posts = await prisma.post.findMany()
      return res.status(200).json({ data: posts })
    } catch (error: any) {
      return res.status(500).json({ errors: [error?.message] })
    }
  }
}
