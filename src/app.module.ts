import { Module } from '@nestjs/common'
import { SharecountModule } from './sharecount/sharecount.module'
import { ExpenseModule } from './expense/expense.module'
import { UserModule } from './user/user.module'
import { AppController } from './app.controller'
import { PrismaService } from './prisma.service'

@Module({
  imports: [SharecountModule, ExpenseModule, UserModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule { }
