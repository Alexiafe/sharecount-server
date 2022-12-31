import { PrismaClient, Prisma } from '@prisma/client'
import * as moment from 'moment';

const prisma = new PrismaClient()

const sharecountData: Prisma.SharecountCreateInput[] = [
  {
    name: 'ShareCount 1',
    currency: 'EUR',
    participants: {
      create: [
        {
          name: 'Alexia',
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
          participant: {
            connect: { id: 1 },
          },
          sharecount: {
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
    console.log(`Created user with id: ${user.email}`)
  }
  for (let i = 0; i < 100; i++) {
    const expense = await prisma.expense.create({
      data: {
        name: 'Expense ' + i,
        amount_total: 10,
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
            }]
        },
      },
    })
    console.log(`Created expense with id: ${expense.id}`)
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