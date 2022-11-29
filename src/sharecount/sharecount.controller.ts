import { Controller, Get, Post, Put, Delete, Body, Param, Headers } from '@nestjs/common'
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
  async getAllSharecounts(@Headers() headers: any): Promise<Sharecount[]> {
    const email = headers.authorization ?? 'alexiaferric@gmail.com'
    return this.sharecountService.getAllSharecounts(email)
  }

  @ApiOperation({ summary: 'Create new sharecount' })
  @ApiResponse({ status: 200, description: 'Return created sharecount' })
  @Post('sharecount')
  async createSharecount(@Headers() headers: any, @Body() sharecountData: ISharecountForm): Promise<Sharecount> {
    const email = headers.authorization ?? 'alexiaferric@gmail.com'
    const parsedSharecount: Prisma.SharecountCreateInput = {
      name: sharecountData.name,
      currency: sharecountData.currency,
      participants: {
        create: sharecountData.participantsToAdd.map(p => ({ name: p })),
      },
      user: {
        connect: { email: email },
      },
    }
    return this.sharecountService.createSharecount(parsedSharecount)
  }

  @ApiOperation({ summary: 'Update sharecount' })
  @ApiResponse({ status: 200, description: 'Return updated sharecount' })
  @Put('sharecount/:id')
  async updateSharecount(
    @Param('id') id: number, @Body() sharecountData: ISharecountForm): Promise<Sharecount> {
    const parsedSharecount: Prisma.SharecountUpdateInput = {
      name: sharecountData.name,
      currency: sharecountData.currency,
      participants: {
        create: sharecountData.participantsToAdd.map(p => ({ name: p })),
        deleteMany: sharecountData.participantsToDelete.map(p => ({ name: p })),
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
