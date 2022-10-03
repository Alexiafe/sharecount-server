import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { ApiResponse, ApiOperation } from '@nestjs/swagger'
import { ExpenseService } from './expense.service'
import { Expense } from '@prisma/client'
import { IExpenseForm } from 'src/interfaces/interfaces'

@Controller()
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) { }

  @ApiOperation({ summary: 'Get expense by id' })
  @ApiResponse({ status: 200, description: 'Return expense' })
  @Get('expense/:id')
  async getExpense(@Param('id') id: number): Promise<Expense> {
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
  async createExpense(@Body() expenseData: IExpenseForm): Promise<Expense> {
    const { name, amount_total, date, sharecount_id, owner_id, partakers } = expenseData
    return this.expenseService.createExpense({
      name,
      amount_total,
      date,
      sharecount: {
        connect: { id: sharecount_id },
      },
      owner: {
        connect: { id: owner_id },
      },
      partakers: {
        create: partakers.map(p => (
          {
            amount: p.amount, participant: { connect: { id: p.participant_id } }
          }))
      },
    })
  }

  @ApiOperation({ summary: 'Update expense' })
  @ApiResponse({ status: 200, description: 'Return updated expense' })
  @Put('expense/:id')
  async updateExpense(@Param('id') id: number, @Body() expenseData: IExpenseForm): Promise<Expense> {
    const { name, amount_total, date, owner_id, partakers } = expenseData
    return this.expenseService.updateExpense({
      where: { id: Number(id) },
      data: {
        name,
        amount_total,
        date,
        owner: {
          connect: { id: owner_id },
        },
        partakers: {
          deleteMany: {},
          create: partakers.map(p => (
            {
              amount: p.amount, participant: { connect: { id: p.participant_id } }
            })),
        },
      }
    })
  }

  @ApiOperation({ summary: 'Delete expense' })
  @ApiResponse({ status: 200, description: 'Return deleted expense' })
  @Delete('expense/:id')
  async deleteExpense(@Param('id') id: number): Promise<Expense> {
    return this.expenseService.deleteExpense({ id: Number(id) })
  }
}
