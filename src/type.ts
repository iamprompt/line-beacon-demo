import { PrismaD1 } from '@prisma/adapter-d1'
import { PrismaClient } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

export type Prisma = PrismaClient<{ adapter: PrismaD1 }, never, DefaultArgs>
