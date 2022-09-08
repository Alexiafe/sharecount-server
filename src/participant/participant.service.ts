import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Prisma, Participant } from '.prisma/client'

@Injectable()
export class ParticipantService {
  constructor(private prisma: PrismaService) {}

  async getParticipant(participantWhereUniqueInput: Prisma.ParticipantWhereUniqueInput): Promise<Participant | null> {
    return this.prisma.participant.findUnique({
      where: participantWhereUniqueInput,
    })
  }

  async getAllParticipants(): Promise<Participant[]> {
    return this.prisma.participant.findMany()
  }

  async createParticipant(data: Prisma.ParticipantCreateInput): Promise<Participant> {
    return this.prisma.participant.create({
      data,
    })
  }

  async updateParticipant(params: { where: Prisma.ParticipantWhereUniqueInput; data: Prisma.ExpenseUpdateInput }): Promise<Participant> {
    const { data, where } = params
    return this.prisma.participant.update({
      data,
      where,
    })
  }

  async deleteParticipant(where: Prisma.ParticipantWhereUniqueInput): Promise<Participant> {
    return this.prisma.participant.delete({
      where,
    })
  }

  async deleteParticipants(data: any): Promise<any> {
    return this.prisma.participant.deleteMany({
      where: {
        AND: [
          { name: { in: data.participants } },
          {
            sharecount_id: {
              equals: data.sharecount,
            },
          },
        ],
      },
    })
  }
}
