import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { ApiResponse, ApiOperation } from '@nestjs/swagger'
import { SharecountService } from './sharecount.service'
import { Prisma, Sharecount } from '@prisma/client'

// Interfaces
import { ISharecountForm } from 'src/interfaces/interfaces'

@Controller()
export class SharecountController {
  constructor(private readonly sharecountService: SharecountService) { }

  @ApiOperation({ summary: 'Get sharecount by id' })
  @ApiResponse({ status: 200, description: 'Return sharecount' })
  @Get('sharecount/:id')
  async getSharecount(@Param('id') id: number): Promise<Sharecount> {
    return this.sharecountService.getSharecount({ id: Number(id) })
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
  async createSharecount(@Body() sharecountData: ISharecountForm): Promise<Sharecount> {
    const parsedParticipants = sharecountData.participantsToAdd.map(p => ({ name: p }))
    const parsedSharecount: Prisma.SharecountCreateInput = {
      name: sharecountData.name,
      currency: sharecountData.currency,
      participants: {
        create: parsedParticipants,
      },
    }
    return this.sharecountService.createSharecount(parsedSharecount)
  }

  @ApiOperation({ summary: 'Update sharecount' })
  @ApiResponse({ status: 200, description: 'Return updated sharecount' })
  @Put('sharecount/:id')
  async updateSharecount(
    @Param('id') id: number, @Body() sharecountData: ISharecountForm): Promise<Sharecount> {
    const parsedParticipantsToAdd = sharecountData.participantsToAdd.map(p => ({ name: p }))
    const parsedParticipantsToDelete = sharecountData.participantsToDelete.map(p => ({ name: p }))
    const parsedSharecount: Prisma.SharecountUpdateInput = {
      name: sharecountData.name,
      currency: sharecountData.currency,
      participants: {
        create: parsedParticipantsToAdd,
        deleteMany: parsedParticipantsToDelete,
      },
    }
    return this.sharecountService.updateSharecount({
      where: { id: Number(id) },
      data: parsedSharecount,
    })
  }

  @ApiOperation({ summary: 'Delete sharecount' })
  @ApiResponse({ status: 200, description: 'Return deleted sharecount' })
  @Delete('sharecount/:id')
  async deleteSharecount(@Param('id') id: number): Promise<Sharecount> {
    return this.sharecountService.deleteSharecount({ id: Number(id) })
  }
}
