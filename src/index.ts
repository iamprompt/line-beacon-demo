import { AppError } from './error'
import { beaconHandler, deliveryHandler, followHandler, messageHandler } from './handler'
import { verifyLineSignature } from './line'

export default {
  async fetch(request, env, ctx): Promise<Response> {
    if (request.method !== 'POST') {
      return Response.json({ message: 'Method Not Allowed' }, { status: 405 })
    }

    try {
      const { body } = await verifyLineSignature(request, env)

      for (const event of body.events) {
        switch (event.type) {
          case 'follow':
            await followHandler(env, event)
            break
          case 'message':
            await messageHandler(env, event)
            break
          case 'beacon':
            await beaconHandler(env, event)
            break
          case 'delivery':
            await deliveryHandler(env, event)
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
