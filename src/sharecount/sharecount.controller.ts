import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { ApiResponse, ApiOperation } from '@nestjs/swagger'
import { SharecountService } from './sharecount.service'
import { Sharecount } from '@prisma/client'

@Controller()
export class SharecountController {
  constructor(private readonly sharecountService: SharecountService) {}

  @ApiOperation({ summary: 'Get sharecount by id' })
  @ApiResponse({ status: 200, description: 'Return sharecount' })
  @Get('sharecount/:id')
  async getSharecount(@Param('id') id: number): Promise<Sharecount> {
    return this.sharecountService.getSharecount({ id: Number(id) })
  }

  @ApiOperation({ summary: 'Get all sharecounts' })
  @ApiResponse({ status: 200, description: 'Return all sharecounts' })
  @Get('sharecountsfiltered')
  async getFilteredSharecount(): Promise<Sharecount[]> {
    return this.sharecountService.getFilteredSharecount()
  }

  @ApiOperation({ summary: 'Get all sharecounts' })
  @ApiResponse({ status: 200, description: 'Return all sharecounts' })
  @Get('sharecounts')
  async getAllSharecounts(): Promise<Sharecount[]> {
    return this.sharecountService.getAllSharecounts()
  }

  @ApiOperation({ summary: 'Create new sharecount' })
  @ApiResponse({ status: 200, description: 'Return created sharecount' })
  @Post('sharecount')
  async createSharecount(@Body() sharecountData: { name: string; currency: string }): Promise<Sharecount> {
    return this.sharecountService.createSharecount(sharecountData)
  }

  @ApiOperation({ summary: 'Update sharecount' })
  @ApiResponse({ status: 200, description: 'Return updated sharecount' })
  @Put('sharecount/:id')
  async updateSharecount(@Param('id') id: string, @Body() data: Sharecount): Promise<Sharecount> {
    return this.sharecountService.updateSharecount({
      where: { id: Number(id) },
      data: data,
    })
  }

  @ApiOperation({ summary: 'Delete sharecount' })
  @ApiResponse({ status: 200, description: 'Return deleted sharecount' })
  @Delete('sharecount/:id')
  async deleteSharecount(@Param('id') id: string): Promise<Sharecount> {
    return this.sharecountService.deleteSharecount({ id: Number(id) })
  }
}