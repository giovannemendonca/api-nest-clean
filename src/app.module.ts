import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { prismaService } from './prisma/prisma.service'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, prismaService],
})
export class AppModule {}
