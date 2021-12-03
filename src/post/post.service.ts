import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Prisma, Post as PostModel } from '@prisma/client'

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getAllPosts(): Promise<PostModel[]> {
    return this.prisma.post.findMany({
      include: {
        author: true,
      },
    })
  }

  async updatePost(params: { where: Prisma.PostWhereUniqueInput; data: Prisma.PostUpdateInput }): Promise<PostModel> {
    const { data, where } = params
    return this.prisma.post.update({
      data,
      where,
    })
  }
}
