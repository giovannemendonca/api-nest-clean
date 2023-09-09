import { Module } from '@nestjs/common'
import { prismaService } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account.controller'

@Module({
  imports: [],
  controllers: [CreateAccountController],
  providers: [prismaService],
})
export class AppModule {}
