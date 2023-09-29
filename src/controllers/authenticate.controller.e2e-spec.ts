import { AppModule } from '@/app.module'
import { prismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Authenticate (E2E)', () => {
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

  test('[POST] /session', async () => {
    await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@exemplo.com',
        password: await hash('123456', 8),
      },
    })

    const authenticate = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'johndoe@exemplo.com',
        password: '123456',
      })
    expect(authenticate.statusCode).toBe(201)
    expect(authenticate.body).toHaveProperty('access_token')
    expect(authenticate.body).toEqual({
      access_token: expect.any(String),
    })
  })
})
