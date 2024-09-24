import { AppError } from './error'
import { reply, verifyLineSignature } from './line'

export default {
  async fetch(request, env, ctx): Promise<Response> {
    if (request.method !== 'POST') {
      return Response.json({ message: 'Method Not Allowed' }, { status: 405 })
    }

    try {
      const { body } = await verifyLineSignature(request, env)

      for (const event of body.events) {
        if (!('replyToken' in event)) {
          continue
        }

        await reply(env, event.replyToken, [
          {
            type: 'text',
            text: JSON.stringify(event, null, 2),
          },
        ])
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
