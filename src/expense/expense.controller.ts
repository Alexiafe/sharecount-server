import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { ApiResponse, ApiOperation } from '@nestjs/swagger'
import { ExpenseService } from './expense.service'
import { Expense } from '@prisma/client'

@Controller()
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @ApiOperation({ summary: 'Get expense by id' })
  @ApiResponse({ status: 200, description: 'Return expense' })
  @Get('expense/:id')
  async getExpense(@Param('id') id: string): Promise<Expense> {
    return this.expenseService.getExpense({ id: Number(id) })
  }

  @ApiOperation({ summary: 'Get all expenses' })
  @ApiResponse({ status: 200, description: 'Return all expenses' })
  @Get('expenses')
  async getAllExpenses(): Promise<Expense[]> {
    return this.expenseService.getAllExpenses()
  }

  @ApiOperation({ summary: 'Create new expense' })
  @ApiResponse({ status: 200, description: 'Return created expense' })
  @Post('expense')
  async createExpense(@Body() expenseData: { name: string; amount_total?: number; sharecount_id: number }): Promise<Expense> {
    const { name, amount_total, sharecount_id } = expenseData
    return this.expenseService.createExpense({
      name,
      amount_total,
      sharecount: {
        connect: { id: sharecount_id },
      },
    })
  }

  @ApiOperation({ summary: 'Update expense' })
  @ApiResponse({ status: 200, description: 'Return updated expense' })
  @Put('expense/:id')
  async updateExpense(@Param('id') id: string, @Body() data: Expense): Promise<Expense> {
    return this.expenseService.updateExpense({
      where: { id: Number(id) },
      data: data,
    })
  }

  @ApiOperation({ summary: 'Delete expense' })
  @ApiResponse({ status: 200, description: 'Return deleted expense' })
  @Delete('expense/:id')
  async deleteExpense(@Param('id') id: string): Promise<Expense> {
    return this.expenseService.deleteExpense({ id: Number(id) })
  }
}
