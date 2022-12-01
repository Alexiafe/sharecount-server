import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Prisma, Sharecount } from '@prisma/client'

@Injectable()
export class SharecountService {
  constructor(private prisma: PrismaService) { }

  async getSharecount(sharecountWhereUniqueInput: Prisma.SharecountWhereUniqueInput): Promise<Sharecount | null | any> {
    return this.prisma.sharecount.findUnique({
      where: sharecountWhereUniqueInput,
      include: {
        userInSharecount: {
          select: {
            user: { select: { email: true } },
            participant: { select: { name: true } }
          }
        },
        participants: {
          orderBy: {
            name: 'asc',
          }
        },
        expenses: {
          orderBy: {
            created_at: 'desc',
          },
          include: {
            owner: true,
            partakers: {
              include: {
                participant: true,
              },
            }
          },
        },
      },
    })
  }

  async getAllSharecounts(): Promise<Sharecount[]> {
    return this.prisma.sharecount.findMany({
      orderBy: [
        {
          created_at: 'desc',
        },
      ],
      include: {
        participants: {
          select: {
            name: true,
            balance: true,
          },
        },
      },
    })
  }

  async createSharecount(data: Prisma.SharecountCreateInput): Promise<Sharecount> {
    return this.prisma.sharecount.create({
      data,
    })
  }

  async updateSharecount(params: { where: Prisma.SharecountWhereUniqueInput; data: Prisma.SharecountUpdateInput }): Promise<Sharecount> {
    const { data, where } = params
    return this.prisma.sharecount.update({
      data,
      where,
    })
  }

  async deleteSharecount(where: Prisma.SharecountWhereUniqueInput): Promise<Sharecount> {
    return this.prisma.sharecount.delete({
      where,
    })
  }
}
