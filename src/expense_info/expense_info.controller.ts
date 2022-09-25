import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { ApiResponse, ApiOperation } from '@nestjs/swagger'
import { Expense_infoService } from './expense_info.service'
import { Expense_info } from '@prisma/client'

@Controller()
export class Expense_infoController {
  constructor(private readonly expense_infoService: Expense_infoService) { }

  @ApiOperation({ summary: 'Get expense_info by id' })
  @ApiResponse({ status: 200, description: 'Return expense_info' })
  @Get('expense_info/:id')
  async getExpense_info(@Param('id') id: string): Promise<Expense_info> {
    return this.expense_infoService.getExpense_info({ id: Number(id) })
  }

  @ApiOperation({ summary: 'Get all expense_infos' })
  @ApiResponse({ status: 200, description: 'Return all expense_infos' })
  @Get('expense_infos')
  async getAllExpense_info(): Promise<Expense_info[]> {
    return this.expense_infoService.getAllExpense_info()
  }

  @ApiOperation({ summary: 'Create new expense_info' })
  @ApiResponse({ status: 200, description: 'Return created expense_info' })
  @Post('expense_info')
  async createExpense_info(@Body() expense_infoData: { amount?: number; expense: number, participant: number }): Promise<Expense_info> {
    const { amount, expense, participant } = expense_infoData
    return this.expense_infoService.createExpense_info({
      amount,
      expense: {
        connect: { id: expense },
      },
      participant: {
        connect: { id: participant },
      },
    })
  }

  @ApiOperation({ summary: 'Update expense_info' })
  @ApiResponse({ status: 200, description: 'Return updated expense_info' })
  @Put('expense_info/:id')
  async updateExpense_info(@Param('id') id: string, @Body() data: Expense_info): Promise<Expense_info> {
    return this.expense_infoService.updateExpense_info({
      where: { id: Number(id) },
      data: data,
    })
  }

  @ApiOperation({ summary: 'Delete expense_info' })
  @ApiResponse({ status: 200, description: 'Return deleted expense_info' })
  @Delete('expense_info/:id')
  async deleteExpense_info(@Param('id') id: string): Promise<Expense_info> {
    return this.expense_infoService.deleteExpense_info({ id: Number(id) })
  }
}
