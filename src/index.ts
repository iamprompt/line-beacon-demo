import { createHmac } from 'node:crypto'
import { reply, verifyLineSignature } from './line'
import { AppError } from './error'

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

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

      return Response.json(
        { message: (error as Error).message },
        { status: 500 },
      )
    }
  },
} satisfies ExportedHandler<Env>
