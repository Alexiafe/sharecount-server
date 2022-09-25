import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const sharecountData: Prisma.SharecountCreateInput[] = [
  {
    name: 'ShareCount 1',
    currency: 'SDG',
    participants: {
      create: [
        {
          name: 'S1 P1 id: 1',
        },
        {
          name: 'S1 P2 id: 2',
        },
        {
          name: 'S1 P3 id: 3',
        },
      ],
    },
    expenses: {
      create: [
        {
          name: 'S1 E1',
          amount_total: 20,
          owner: {
            connect: { id: 1 },
          },
          expense_info: {
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
          name: 'S2 P1 id: 4',
        },
        {
          name: 'S2 P2 id: 5',
        },
        {
          name: 'S2 P3 id: 6',
        },
      ],
    },
    expenses: {
      create: [
        {
          name: 'S2 E1',
          amount_total: 30,
          owner: {
            connect: { id: 4 },
          },
          // participants: {
          //   connect: [{ id: 4 }, { id: 5 }],
          // },
          expense_info: {
            create: [
              {
                amount: 10,
                participant: {
                  connect: { id: 4 },
                }
              },
              {
                amount: 10,
                participant: {
                  connect: { id: 5 },
                }
              },
              {
                amount: 10,
                participant: {
                  connect: { id: 6 },
                }
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
          name: 'S3 P1 id: 7',
        },
        {
          name: 'S3 P2 id: 8',
        },
        {
          name: 'S3 P3 id: 9',
        },
      ],
    },
    expenses: {
      create: [
        {
          name: 'S 3 E 1',
          amount_total: 10,
          owner: {
            connect: { id: 7 },
          },
          // participants: {
          //   connect: [{ id: 8 }],
          // },
          expense_info: {
            create: [
              {
                amount: 10,
                participant: {
                  connect: { id: 8 },
                }
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
          // participants: {
          //   connect: [{ id: 9 }],
          // },
          expense_info: {
            create: [
              {
                amount: 40,
                participant: {
                  connect: { id: 9 },
                }
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
