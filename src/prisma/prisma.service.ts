import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class prismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['warn', 'error'],
    })
  }

  // esse methodo é chamado quando o modulo é iniciado para conectar ao banco de dados
  // serve para quando o servidor é iniciado para já ficar conectado ao banco de dados
  onModuleInit() {
    return this.$connect()
  }

  // esse methodo é chamado quando o modulo é destruído para desconectar do banco de dados
  // serve para quando o servidor é desligado para não ficar conectado ao banco de dados
  onModuleDestroy() {
    return this.$disconnect()
  }
}
