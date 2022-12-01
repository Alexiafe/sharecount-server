import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { ApiResponse, ApiOperation } from '@nestjs/swagger'
import { ExpenseService } from './expense.service'
import { Expense } from '@prisma/client'
import { IExpenseForm } from 'src/interfaces/interfaces'
import { SharecountService } from 'src/sharecount/sharecount.service'

@Controller()
export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly sharecountService: SharecountService
  ) { }

  @ApiOperation({ summary: 'Get expense by id' })
  @ApiResponse({ status: 200, description: 'Return expense' })
  @Get('expense/:id')
  async getExpense(@Param('id') id: number): Promise<Expense> {
    return this.expenseService.getExpense({ id: Number(id) })
  }

  @ApiOperation({ summary: `Get all sharecount's expenses` })
  @ApiResponse({ status: 200, description: `Return all sharecount's expenses` })
  @Get('expenses/:sharecount_id')
  async getAllExpenses(@Param('sharecount_id') sharecount_id: number): Promise<Expense[]> {
    return this.expenseService.getAllExpenses(Number(sharecount_id))
  }

  @ApiOperation({ summary: 'Create new expense' })
  @ApiResponse({ status: 200, description: 'Return created expense' })
  @Post('expense')
  async createExpense(@Body() expenseData: IExpenseForm): Promise<Expense> {
    const { name, amount_total, date, sharecount_id, owner_id, partakers } = expenseData
    const result = await this.expenseService.createExpense({
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
          })),
      },
    })
    this.updateBalance(sharecount_id)
    return result;

  }

  @ApiOperation({ summary: 'Update expense' })
  @ApiResponse({ status: 200, description: 'Return updated expense' })
  @Put('expense/:id')
  async updateExpense(@Param('id') id: number, @Body() expenseData: IExpenseForm): Promise<Expense> {
    const { name, amount_total, date, owner_id, partakers } = expenseData
    const result = await this.expenseService.updateExpense({
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
    this.updateBalance(result.sharecount_id)
    return result;
  }

  @ApiOperation({ summary: 'Delete expense' })
  @ApiResponse({ status: 200, description: 'Return deleted expense' })
  @Delete('expense/:id')
  async deleteExpense(@Param('id') id: number): Promise<Expense> {
    const result = await this.expenseService.deleteExpense({ id: Number(id) })
    this.updateBalance(result.sharecount_id)
    return result;

  }


  // Manage balance

  async updateBalance(sharecount_id: number) {
    let balance = await this.calculBalance(sharecount_id)
    Object.keys(balance).forEach(async (participant_id) => {
      await this.expenseService.updateBalance({
        where: { id: Number(participant_id) },
        data: {
          balance: balance[participant_id],
        }
      })
    })
  }

  async calculBalance(sharecount_id: number): Promise<any> {
    let sharecount = await this.sharecountService.getSharecount({ id: Number(sharecount_id) })
    let expenses = sharecount.expenses
    let participants = sharecount.participants
    let participantsBalance = participants
      .map(p => { return { id: p.id, balance: 0 } })
      .reduce((acc, it) => (acc[it.id] = it.balance, acc), {})
    expenses.forEach(expense => {
      let owner = expense.owner_id
      let partakers = expense.partakers
      let amount_total = expense.amount_total
      participantsBalance[owner] += amount_total
      partakers.forEach(partaker => {
        let participant_id = partaker.participant_id
        let amount = partaker.amount
        participantsBalance[participant_id] -= amount
      })
    })

    return participantsBalance
  }
}
