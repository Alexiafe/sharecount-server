import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { User, UserInSharecount } from '@prisma/client'
import { IUserForm, IUserInSharecountDataForm } from 'src/interfaces/interfaces'
import { UserService } from './user.service'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: 'Get user by email' })
  @ApiResponse({ status: 200, description: 'Return user' })
  @Get('user/:email')
  async getUser(@Param('email') email: string, @Query('page') page: number): Promise<User> {
    return this.userService.getUser({ email: email }, page)
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users' })
  @Get('users')
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers()
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 200, description: 'Return created user' })
  @Post('user')
  async createUser(@Body() userData: IUserForm): Promise<User> {
    return this.userService.createUser(userData)
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'Return deleted user' })
  @Delete('user/:email')
  async deleteUser(@Param('email') email: string): Promise<User> {
    return this.userService.deleteUser({ email: email })
  }

  @ApiOperation({ summary: 'Remove user from Sharecount' })
  @ApiResponse({ status: 200, description: 'Return xxx' })
  @Delete('userInSharecountData')
  async removeUserFromSharecount(@Body() userInSharecountData: IUserInSharecountDataForm): Promise<UserInSharecount> {
    return this.userService.removeUserFromSharecount(userInSharecountData)
  }

}
