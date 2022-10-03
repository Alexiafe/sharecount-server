import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Prisma, Expense } from '@prisma/client'

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

  async getAllExpenses(): Promise<Expense[]> {
    return this.prisma.expense.findMany()
  }

  async createExpense(data: Prisma.ExpenseCreateInput): Promise<Expense> {
    return this.prisma.expense.create({
      data,
    })
  }

  async updateExpense(params: { where: Prisma.ExpenseWhereUniqueInput; data: Prisma.ExpenseUpdateInput }): Promise<Expense> {
    const { data, where } = params
    return this.prisma.expense.update({
      data,
      where,
    })
  }

  async deleteExpense(where: Prisma.ExpenseWhereUniqueInput): Promise<Expense> {
    return this.prisma.expense.delete({
      where,
    })
  }
}
