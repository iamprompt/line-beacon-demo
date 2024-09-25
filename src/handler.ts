import { BeaconEvent, DeliveryEvent, FollowEvent, MessageEvent } from '@line/bot-sdk'

import { reply } from './line'

export const followHandler = async (event: FollowEvent, env: Env) => {
  await reply(env, event.replyToken, [{ type: 'text', text: JSON.stringify(event, null, 2) }])
  return
}

export const messageHandler = async (event: MessageEvent, env: Env) => {
  await reply(env, event.replyToken, [{ type: 'text', text: JSON.stringify(event, null, 2) }])
  return
}

export const beaconHandler = async (event: BeaconEvent, env: Env) => {
  await reply(env, event.replyToken, [{ type: 'text', text: JSON.stringify(event, null, 2) }])
  return
}

export const deliveryHandler = async (event: DeliveryEvent, env: Env) => {
  return
}
