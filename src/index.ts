import { PrismaD1 } from '@prisma/adapter-d1'
import { PrismaClient } from '@prisma/client'

import { AppError } from './error'
import { beaconHandler, followHandler, messageHandler } from './handler'
import { verifyLineSignature } from './line'
import { logEventToDb } from './utils'

export default {
  async fetch(request, env, ctx): Promise<Response> {
    if (request.method !== 'POST') {
      return Response.json({ message: 'Method Not Allowed' }, { status: 405 })
    }

    const adapter = new PrismaD1(env.db)
    const db = new PrismaClient({ adapter })

    try {
      const { body } = await verifyLineSignature(request, env)

      for (const event of body.events) {
        await logEventToDb(db, event)

        switch (event.type) {
          case 'follow':
            await followHandler(event, env, db)
            break
          case 'message':
            await messageHandler(event, env, db)
            break
          case 'beacon':
            await beaconHandler(event, env, db)
            break
        }
      }

      return Response.json({ message: 'OK' })
    } catch (error) {
      if (error instanceof AppError) {
        const { status } = error
        return Response.json(error, { status })
      }

      return Response.json({ message: (error as Error).message }, { status: 500 })
    }
  },
} satisfies ExportedHandler<Env>
