import { BeaconEvent, DeliveryEvent, FollowEvent, MessageEvent } from '@line/bot-sdk'

import { reply } from './line'

export const followHandler = async (env: Env, event: FollowEvent) => {
  await reply(env, event.replyToken, [{ type: 'text', text: JSON.stringify(event, null, 2) }])
  return
}

export const messageHandler = async (env: Env, event: MessageEvent) => {
  await reply(env, event.replyToken, [{ type: 'text', text: JSON.stringify(event, null, 2) }])
  return
}

export const beaconHandler = async (env: Env, event: BeaconEvent) => {
  await reply(env, event.replyToken, [{ type: 'text', text: JSON.stringify(event, null, 2) }])
  return
}

export const deliveryHandler = async (env: Env, event: DeliveryEvent) => {
  return
}
