import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { prismaService } from '@/prisma/prisma.service'
import { z } from 'zod'

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)

type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private prisma: prismaService) {}

  @Get()
  async handler(
    @Query('page', queryValidationPipe) page: PageQueryParamsSchema,
  ) {
    const perPage = 1

    const questions = await this.prisma.question.findMany({
      take: 1,
      skip: page - 1 * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      questions,
    }
  }
}
