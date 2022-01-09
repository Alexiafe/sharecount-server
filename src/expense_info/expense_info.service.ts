import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Prisma, Expense_info } from '@prisma/client'

@Injectable()
export class Expense_infoService {
  constructor(private prisma: PrismaService) {}

  async getExpense_info(expense_infoWhereUniqueInput: Prisma.Expense_infoWhereUniqueInput): Promise<Expense_info | null> {
    return this.prisma.expense_info.findUnique({
      where: expense_infoWhereUniqueInput,
    })
  }

  async getAllExpense_info(): Promise<Expense_info[]> {
    return this.prisma.expense_info.findMany()
  }

  async createExpense_info(data: Prisma.Expense_infoCreateInput): Promise<Expense_info> {
    return this.prisma.expense_info.create({
      data,
    })
  }

  async updateExpense_info(params: { where: Prisma.Expense_infoWhereUniqueInput; data: Prisma.Expense_infoUpdateInput }): Promise<Expense_info> {
    const { data, where } = params
    return this.prisma.expense_info.update({
      data,
      where,
    })
  }

  async deleteExpense_info(where: Prisma.Expense_infoWhereUniqueInput): Promise<Expense_info> {
    return this.prisma.expense_info.delete({
      where,
    })
  }
}
