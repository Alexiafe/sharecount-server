import { Body, Controller, Get, Param, Put } from '@nestjs/common'
import { ApiResponse, ApiOperation } from '@nestjs/swagger'
import { PostService } from './post.service'
import { Post as PostModel } from '@prisma/client'

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'Return all posts' })
  @Get('posts')
  async getAllPosts(): Promise<PostModel[]> {
    return this.postService.getAllPosts()
  }

  @ApiOperation({ summary: 'Update post' })
  @ApiResponse({ status: 200, description: 'Return updated post' })
  @Put('publish/:id')
  async publishPost(@Param('id') id: string, @Body() data: PostModel): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: data,
    })
  }
}
