import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Prisma, Expense, Participant } from '@prisma/client'

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) { }

  async getExpense(expenseWhereUniqueInput: Prisma.ExpenseWhereUniqueInput): Promise<Expense | null> {
    return this.prisma.expense.findUnique({
      where: expenseWhereUniqueInput,
      include: {
        partakers: {
          include: {
            participant: true,
          }
        },
        owner: true
      },
    })
  }

  async getAllExpenses(sharecount_id: number, page: number): Promise<Expense[]> {
    return this.prisma.expense.findMany({
      where: {
        sharecount_id: {
          equals: sharecount_id,
        },
      },
      skip: page ? page * 10 : 0,
      take: 10,
      orderBy: {
        id: 'desc',
      },
      include: {
        partakers: {
          include: {
            participant: true,
          }
        },
        owner: true
      },
    })
  }

  async getfilteredExpenses(sharecount_id: number, filter: string): Promise<Expense[]> {
    return this.prisma.expense.findMany({
      where: {
        sharecount_id: {
          equals: sharecount_id,
        },
        AND: {
          name: {
            contains: filter,
          }
        }
      },
      orderBy: {
        id: 'desc',
      },
      include: {
        partakers: {
          include: {
            participant: true,
          }
        },
        owner: true
      },
    })
  }

  async createExpense(data: Prisma.ExpenseCreateInput): Promise<Expense> {
    return this.prisma.expense.create({
      data,
      include: {
        sharecount: {
          include: {
            participants: true,
          }
        },
        owner: true,
        partakers: {
          include: {
            participant: true,
          }
        },
      }
    })
  }

  async updateExpense(params: { where: Prisma.ExpenseWhereUniqueInput; data: Prisma.ExpenseUpdateInput }): Promise<Expense> {
    const { data, where } = params
    return this.prisma.expense.update({
      data,
      where,
      include: {
        sharecount: {
          include: {
            participants: true,
          }
        },
        owner: true,
        partakers: {
          include: {
            participant: true,
          }
        }
      }
    })
  }

  async deleteExpense(where: Prisma.ExpenseWhereUniqueInput): Promise<Expense> {
    return this.prisma.expense.delete({
      where,
      include: {
        sharecount: {
          include: {
            participants: true,
          }
        },
        owner: true,
        partakers: {
          include: {
            participant: true,
          }
        }
      }
    })
  }

  // Manage balance
  async updateBalance(params: { where: Prisma.ParticipantWhereUniqueInput; data: Prisma.ParticipantUpdateInput }): Promise<Participant> {
    const { data, where } = params
    return this.prisma.participant.update({
      data,
      where,
    })
  }
}
