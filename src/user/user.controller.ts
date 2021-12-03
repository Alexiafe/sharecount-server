import { Controller, Get, Post, Body } from '@nestjs/common'
import { ApiResponse, ApiOperation } from '@nestjs/swagger'
import { UserService } from './user.service'
import { User } from '@prisma/client'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all user' })
  @Get('users')
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers()
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 200, description: 'Return created user' })
  @Post('user')
  async signupUser(@Body() userData: { name?: string; email: string }): Promise<User> {
    return this.userService.createUser(userData)
  }
}
