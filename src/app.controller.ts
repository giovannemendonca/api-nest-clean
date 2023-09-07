import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { prismaService } from './prisma/prisma.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: prismaService,
  ) {}

  @Get()
  async getHello() {
    return await this.prisma.user.findMany()
  }
}
