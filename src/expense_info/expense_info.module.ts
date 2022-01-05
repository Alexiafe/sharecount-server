import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { Expense_infoController } from './expense_info.controller'
import { Expense_infoService } from './expense_info.service'

@Module({
  imports: [],
  controllers: [Expense_infoController],
  providers: [PrismaService, Expense_infoService],
})
export class Expense_infoModule {}
