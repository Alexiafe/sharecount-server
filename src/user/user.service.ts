import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from '../prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async getUser(UserWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.findUnique({
      where: UserWhereUniqueInput
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

}
