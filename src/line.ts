import { createHmac } from 'crypto'
import { WebhookRequestBody, type Message } from '@line/bot-sdk'
import { AppError, ErrorCode } from './error'

export const verifyLineSignature = async (request: Request, env: Env) => {
  const body = (await request.json()) as WebhookRequestBody
  const comparedSignature = createHmac(
    'SHA256',
    env.LINE_MESSAGING_API_CHANNEL_SECRET,
  )
    .update(JSON.stringify(body))
    .digest('base64')
    .toString()

  if (comparedSignature === request.headers.get('x-line-signature')) {
    return { body }
  }

  throw new AppError(ErrorCode.INVALID_SIGNATURE)
}

type StatelessTokenResponse = {
  token_type: string
  access_token: string
  expires_in: number
}

export const getStatelessToken = async (env: Env) => {
  const token = await fetch('https://api.line.me/oauth2/v3/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: env.LINE_MESSAGING_API_CHANNEL_ID,
      client_secret: env.LINE_MESSAGING_API_CHANNEL_SECRET,
    }),
  }).then((response) => response.json() as Promise<StatelessTokenResponse>)

  return token.access_token
}

type SendMessageResponse = {
  sentMessages: {
    id: string
    quoteToken?: string
  }[]
}

export const reply = async (
  env: Env,
  replyToken: string,
  messages: Message[] = [],
) => {
  const token = await getStatelessToken(env)

  const response = await fetch('https://api.line.me/v2/bot/message/reply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ replyToken, messages }),
  }).then((response) => response.json() as Promise<SendMessageResponse>)

  return response
}
