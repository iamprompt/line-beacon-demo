import { BeaconEvent, DeliveryEvent, FollowEvent, MessageEvent } from '@line/bot-sdk'

import { beaconSessionCacheKey } from './constants'
import { getProfile, reply } from './line'
import { AutoMessages, BeaconEnterMessage, GreetingMessage, InEventMessages } from './messages'
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
  if (event.message.type !== 'text') {
    return
  }

  if (event.source.type !== 'user') {
    return
  }

  const text = event.message.text

  const isInBeaconSessionCache = await env.kv.get(beaconSessionCacheKey(event.source.userId))
  const isInBeaconSession = isInBeaconSessionCache && isInBeaconSessionCache === 'true'

  const replyMessages = isInBeaconSession ? InEventMessages(text) : AutoMessages(text)
  if (replyMessages.length === 0) {
    return
  }

  await reply(env, event.replyToken, replyMessages)
  return
}

export const beaconHandler = async (event: BeaconEvent, env: Env, db: Prisma) => {
  if (event.source.type !== 'user') {
    return
  }

  const isInBeaconSession = await env.kv.get(beaconSessionCacheKey(event.source.userId))
  if (isInBeaconSession && isInBeaconSession === 'true') {
    return
  }

  await env.kv.put(beaconSessionCacheKey(event.source.userId), 'true', { expirationTtl: 60 * 60 })
  await reply(env, event.replyToken, [BeaconEnterMessage()])
  return
}

export const deliveryHandler = async (event: DeliveryEvent, env: Env, db: Prisma) => {
  return
}
