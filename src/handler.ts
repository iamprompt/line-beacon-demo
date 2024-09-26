import { BeaconEvent, DeliveryEvent, FollowEvent, MessageEvent } from '@line/bot-sdk'

import { getProfile, reply } from './line'
import { BeaconEnterMessage, GreetingMessage } from './messages'
import { Prisma } from './type'

export const followHandler = async (event: FollowEvent, env: Env, db: Prisma) => {
  const { userId } = event.source

  if (!userId) {
    return
  }

  const profile = await getProfile(env, userId, db)

  if (!profile) {
    return
  }

  await reply(env, event.replyToken, [GreetingMessage({ displayName: profile.displayName })])
  return
}

export const messageHandler = async (event: MessageEvent, env: Env, db: Prisma) => {
  await reply(env, event.replyToken, [{ type: 'text', text: JSON.stringify(event, null, 2) }])
  return
}

export const beaconHandler = async (event: BeaconEvent, env: Env, db: Prisma) => {
  const latestBeaconEvent = await db.webhookEvent.findFirst({
    where: {
      type: 'beacon',
      webhookEventId: { not: event.webhookEventId },
      timestamp: { gt: new Date(Date.now() - 1000 * 60 * 60 * 24) },
    },
    orderBy: { timestamp: 'desc' },
  })

  if (latestBeaconEvent) {
    return
  }

  await reply(env, event.replyToken, [BeaconEnterMessage()])
  return
}

export const deliveryHandler = async (event: DeliveryEvent, env: Env, db: Prisma) => {
  return
}
