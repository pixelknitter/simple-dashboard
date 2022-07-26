import prisma from "./db"

async function main() {
  await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      author: "Eddie",
      body: "You're doing a great job",
    },
  })
  await prisma.post.upsert({
    where: { id: 2 },
    update: {},
    create: {
      author: "Eddie",
      body: "Keep going!",
    },
  })
  await prisma.post.upsert({
    where: { id: 3 },
    update: {},
    create: {
      author: "Jon",
      body: "Way to go!",
    },
  })
  await prisma.post.upsert({
    where: { id: 4 },
    update: {},
    create: {
      author: "Alondra",
      body: "What an inspiration!",
    },
  })
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
