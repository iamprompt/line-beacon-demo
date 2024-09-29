import { WebhookEvent } from '@line/bot-sdk'

import { beaconSessionCacheKey } from './constants'
import { Prisma } from './type'

export const getBeaconSessionCache = async (env: Env, userId: string) => {
  return await env.kv.get(beaconSessionCacheKey(userId))
}

export const setBeaconSessionCache = async (env: Env, userId: string) => {
  await env.kv.put(beaconSessionCacheKey(userId), 'true', { expirationTtl: 60 * 60 })
}

export const logEventToDb = async (db: Prisma, event: WebhookEvent) => {
  await db.webhookEvent.create({
    data: {
      type: event.type,
      webhookEventId: event.webhookEventId,
      payload: JSON.stringify(event),
      replyToken: 'replyToken' in event ? event.replyToken : null,
      timestamp: new Date(event.timestamp),
    },
  })
}
