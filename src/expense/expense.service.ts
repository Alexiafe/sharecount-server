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
        owner: true,
        partakers: true,
      },
    })
  }

  async getAllExpenses(sharecount_id: number): Promise<Expense[]> {
    return this.prisma.expense.findMany({
      where: {
        sharecount_id: {
          equals: sharecount_id,
        },
      },
      include: {
        partakers: true,
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
