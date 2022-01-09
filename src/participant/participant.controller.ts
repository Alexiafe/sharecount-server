import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { ApiResponse, ApiOperation } from '@nestjs/swagger'
import { ParticipantService } from './participant.service'
import { Participant } from '@prisma/client'

@Controller()
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @ApiOperation({ summary: 'Get participant by id' })
  @ApiResponse({ status: 200, description: 'Return participant' })
  @Get('participant/:id')
  async getParticipant(@Param('id') id: string): Promise<Participant> {
    return this.participantService.getParticipant({ id: Number(id) })
  }

  @ApiOperation({ summary: 'Get all participants' })
  @ApiResponse({ status: 200, description: 'Return all participants' })
  @Get('participants')
  async getAllParticipants(): Promise<Participant[]> {
    return this.participantService.getAllParticipants()
  }

  @ApiOperation({ summary: 'Create new participant' })
  @ApiResponse({ status: 200, description: 'Return created participant' })
  @Post('participant')
  async createParticipant(@Body() expenseData: { name: string; sharecount: number }): Promise<Participant> {
    const { name, sharecount } = expenseData
    return this.participantService.createParticipant({
      name,
      sharecount: {
        connect: { id: sharecount },
      },
    })
  }

  @ApiOperation({ summary: 'Update participant' })
  @ApiResponse({ status: 200, description: 'Return updated participant' })
  @Put('participant/:id')
  async updateParticipant(@Param('id') id: string, @Body() data: Participant): Promise<Participant> {
    return this.participantService.updateParticipant({
      where: { id: Number(id) },
      data: data,
    })
  }

  @ApiOperation({ summary: 'Delete participant' })
  @ApiResponse({ status: 200, description: 'Return deleted participant' })
  @Delete('participant/:id')
  async deleteParticipant(@Param('id') id: string): Promise<Participant> {
    return this.participantService.deleteParticipant({ id: Number(id) })
  }
}
