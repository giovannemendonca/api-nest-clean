import { AppModule } from '@/app.module'
import { prismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create account (E2E)', () => {
  let app: INestApplication
  let prisma: prismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(prismaService)

    await app.init()
  })

  test('[POST] /accounts', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'John Doe',
      email: 'johndoe@exemplo.com',
      password: '123456',
    })
    expect(response.statusCode).toBe(201)

    const useOnDatabase = await prisma.user.findUnique({
      where: {
        email: 'johndoe@exemplo.com',
      },
    })
    expect(useOnDatabase).toBeTruthy()
  })
})
