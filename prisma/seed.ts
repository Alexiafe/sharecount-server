import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const sharecountData: Prisma.SharecountCreateInput[] = [
  {
    name: 'ShareCount 1',
    currency: 'SDG',
    participants: {
      create: [
        {
          name: 'Alexia',
        },
      ],
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of sharecountData) {
    const sharecount = await prisma.sharecount.create({
      data: u,
    })
    console.log(`Created sharecount with id: ${sharecount.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })