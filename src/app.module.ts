import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { PostModule } from './post/post.module'
import { AppController } from './app.controller'
import { PrismaService } from './prisma.service'

@Module({
  imports: [UserModule, PostModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
