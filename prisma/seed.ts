import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const sharecountData: Prisma.SharecountCreateInput[] = [
  {
    name: 'ShareCount 1',
    currency: 'SDG',
    expenses: {
      create: [
        {
          name: 'Expense 1',
          amount_total: 10,
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
    expenses: {
      create: [
        {
          name: 'Expense 1',
        },
      ],
    },
    participants: {
      create: [
        {
          name: 'Alexia',
        },
        {
          name: 'Louis',
        },
      ],
    },
  },
  {
    name: 'ShareCount 3',
    currency: 'EUR',
    expenses: {
      create: [
        {
          name: 'Expense 1',
          amount_total: 10,
        },
        {
          name: 'Expense 2',
          amount_total: 20,
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
