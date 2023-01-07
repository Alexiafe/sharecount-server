import { Injectable } from '@nestjs/common'
import { Prisma, User, UserInSharecount } from '@prisma/client'
import { IUserInSharecountDataForm } from 'src/interfaces/interfaces'
import { PrismaService } from '../prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async getUser(UserWhereUniqueInput: Prisma.UserWhereUniqueInput, page: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: UserWhereUniqueInput,
      include: {
        userInSharecount: {
          skip: page ? page * 10 : 0,
          take: 10,
          orderBy: {
            sharecount_id: 'desc',
          },
          include: {
            sharecount: true,
            participant: true,
          },
        },
      }
    })
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany()
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    })
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    })
  }

  async removeUserFromSharecount(where: IUserInSharecountDataForm): Promise<UserInSharecount> {
    return this.prisma.userInSharecount.delete({
      where: {
        sharecount_id_user_email: {
          sharecount_id: where.sharecount_id,
          user_email: where.user_email,
        },
      },
    })
  }

}
