import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { SharecountController } from './sharecount.controller'
import { SharecountService } from './sharecount.service'

@Module({
  imports: [],
  controllers: [SharecountController],
  providers: [PrismaService, SharecountService],
})
export class SharecountModule {}
