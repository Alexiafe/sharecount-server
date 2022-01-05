import { Module } from '@nestjs/common'
import { ExpenseModule } from './expense/expense.module'
import { Expense_infoModule } from './expense_info/expense_info.module'
import { SharecountModule } from './sharecount/sharecount.module'
import { ParticipantModule } from './participant/participant.module'
import { AppController } from './app.controller'
import { PrismaService } from './prisma.service'

@Module({
  imports: [ExpenseModule, Expense_infoModule, SharecountModule, ParticipantModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
