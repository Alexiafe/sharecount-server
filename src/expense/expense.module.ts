import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ExpenseController } from './expense.controller'
import { ExpenseService } from './expense.service'
import { SharecountService } from 'src/sharecount/sharecount.service'

@Module({
  imports: [],
  controllers: [ExpenseController],
  providers: [PrismaService, ExpenseService, SharecountService],
})
export class ExpenseModule {}
