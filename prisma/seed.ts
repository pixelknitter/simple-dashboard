import { Prisma } from "@prisma/client"
import prisma from "./db"

async function main() {
  let users: Prisma.PostCreateInput[] = [
    {
      author: "Eddie",
      body: "You're doing a great job",
    },
    {
      author: "Eddie",
      body: "Keep going!",
    },
    {
      author: "Jon",
      body: "Way to go!",
    },
    {
      author: "Alondra",
      body: "What an inspiration!",
    },
  ]

  await Promise.all(
    users.map(async (user) => {
      await prisma.post.create({
        data: user,
      })
    })
  )
  const posts = prisma.post.findMany()
  console.debug("Done.", { posts })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
