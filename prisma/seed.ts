import { PrismaClient, Prisma } from '@prisma/client'
import * as moment from 'moment';

const prisma = new PrismaClient()

const sharecountData: Prisma.SharecountCreateInput[] = [
  {
    name: 'ShareCount 0',
    currency: 'EUR',
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
    name: 'ShareCount 1',
    currency: 'EUR',
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
]

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'alexiaferric@gmail.com',
    userInSharecount: {
      create: [
        {
          sharecount: {
            connect: { id: 1 },
          },
          participant: {
            connect: { id: 1 },
          }
        },
        {
          sharecount: {
            connect: { id: 2 },
          },
          participant: {
            connect: { id: 1 },
          }

        }
      ],
    }
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
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with email: ${user.email}`)
  }
  for (let i = 0; i < 20; i++) {
    const expense = await prisma.expense.create({
      data: {
        name: 'Expense ' + i,
        amount_total: 20,
        date: moment().utcOffset(0).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).format(),
        sharecount: {
          connect: { id: 1 },
        },
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
            }]
        },
      },
    })
    console.log(`Created expense with id: ${expense.id}`)
  }
  for (let i = 0; i < 3; i++) {
    const expense = await prisma.expense.create({
      data: {
        name: 'Expense ' + i,
        amount_total: 20,
        date: moment().utcOffset(0).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).format(),
        sharecount: {
          connect: { id: 2 },
        },
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
            }]
        },
      },
    })
    console.log(`Created expense with id: ${expense.id}`)
  }
  for (let i = 2; i < 20; i++) {
    const sharecount = await prisma.sharecount.create({
      data: {
        name: 'Sharecount ' + i,
        currency: 'EUR',
        userInSharecount: {
          create: [
            {
              participant: { connect: { id: 1 } },
              user: { connect: { email: 'alexiaferric@gmail.com' } }
            }
          ]
        },
        participants: {
          create: [
            {
              name: 'Alexia',
            },
          ],
        },
      }
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