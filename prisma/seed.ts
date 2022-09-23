import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const sharecountData: Prisma.SharecountCreateInput[] = [
  {
    name: 'ShareCount 1',
    currency: 'SDG',
    participants: {
      create: [
        {
          name: 'S 1 P 1',
        },
        {
          name: 'S 1 P 2',
        },
        {
          name: 'S 1 P 3',
        },
      ],
    },
    expenses: {
      create: [
        {
          name: 'S 1 E 1',
          amount_total: 10,
          owner: {
            connect: { id: 1 },
          },
          expense_info: {
            create: [
              {
                amount: 10,
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: 'ShareCount 2',
    currency: 'SDG',
    participants: {
      create: [
        {
          name: 'S 2 P 1',
        },
        {
          name: 'S 2 P 2',
        },
        {
          name: 'S 2 P 3',
        },
      ],
    },
    expenses: {
      create: [
        {
          name: 'S 2 E 1',
          amount_total: 20,
          owner: {
            connect: { id: 4 },
          },
          expense_info: {
            create: [
              {
                amount: 20,
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: 'ShareCount 3',
    currency: 'EUR',
    participants: {
      create: [
        {
          name: 'S 3 P 1',
        },
        {
          name: 'S 3 P 2',
        },
        {
          name: 'S 3 P 3',
        },
      ],
    },
    expenses: {
      create: [
        {
          name: 'S 3 E 1',
          amount_total: 30,
          owner: {
            connect: { id: 7 },
          },
          expense_info: {
            create: [
              {
                amount: 30,
              },
            ],
          },
        },
        {
          name: 'S 3 E 2',
          amount_total: 40,
          owner: {
            connect: { id: 8 },
          },
          expense_info: {
            create: [
              {
                amount: 40,
              },
            ],
          },
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
