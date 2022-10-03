import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const sharecountData: Prisma.SharecountCreateInput[] = [
  {
    name: 'ShareCount 1',
    currency: 'SDG',
    participants: {
      create: [
        {
          name: 'Participant 1',
        },
        {
          name: 'Participant 2',
        },
        {
          name: 'Participant 3',
        },
      ],
    },
    expenses: {
      create: [
        {
          name: 'Expense 1',
          amount_total: 20,
          owner: {
            connect: { id: 1 },
          },
          partakers: {
            create: [
              {
                amount: 10,
                participant: {
                  connect: { id: 1 },
                }
              },
              {
                amount: 10,
                participant: {
                  connect: { id: 2 },
                }
              }
            ]
          }
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
          name: 'Participant 1',
        },
        {
          name: 'Participant 2',
        },
        {
          name: 'Participant 3',
        },
      ],
    },
    expenses: {
      create: [
        {
          name: 'Expense 1',
          amount_total: 30,
          owner: {
            connect: { id: 4 },
          },
          partakers: {
            create: [
              {
                amount: 30,
                participant: {
                  connect: { id: 4 },
                }
              },
            ]
          }
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
          name: 'Participant 1',
        },
        {
          name: 'Participant 2',
        },
        {
          name: 'Participant 3',
        },
      ],
    },
    expenses: {
      create: [
        {
          name: 'Expense 1',
          amount_total: 15,
          owner: {
            connect: { id: 7 },
          },
          partakers: {
            create: [
              {
                amount: 5,
                participant: {
                  connect: { id: 7 },
                }
              },
              {
                amount: 5,
                participant: {
                  connect: { id: 8 },
                }
              },
              {
                amount: 5,
                participant: {
                  connect: { id: 9 },
                }
              }
            ]
          }
        },
        {
          name: 'Expense 2',
          amount_total: 40,
          owner: {
            connect: { id: 8 },
          },
          partakers: {
            create: [
              {
                amount: 20,
                participant: {
                  connect: { id: 8 },
                }
              },
              {
                amount: 20,
                participant: {
                  connect: { id: 9 },
                }
              }
            ]
          }
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