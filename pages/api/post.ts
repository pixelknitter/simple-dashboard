// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { Post } from "../../models/Post"
// import prisma from "../../lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // const { title, content, authorEmail } = req.body
    // const result = await prisma.post.create({
    //   data: {
    //     title: title,
    //     content: content,
    //     author: { connect: { email: authorEmail } },
    //   },
    // })
    // return res.json(result)
  }
  if (req.method === "PUT") {
  }
  if (req.method === "GET") {
    res.status(200).json({ data: testPosts })
    // const posts = await prisma.post.findMany({
    //   where: { published: true },
    //   include: { author: true },
    // })
    // res.json(posts)
  }
  // Implement rest endpoints for getting, creating, and posting 'posts'.
}

const testPosts: Post[] = [
  { author: "John", body: "You're doing a great job" },
  { author: "Eddie", body: "Keep going!" },
]
