import { Message } from '@line/bot-sdk'

type GreetingMessageParams = {
  displayName?: string
}

export const GreetingMessage = ({ displayName = 'John Doe' }: GreetingMessageParams = {}): Message => ({
  type: 'text',
  text: `สวัสดีคุณ ${displayName}\nยินดีต้อนรับสู่เวิร์กช็อปที่เฮฮาและสนุกสนานที่สุดในโลก`,
})

type BeaconEnterMessageParams = {
  displayName?: string
}

export const BeaconEnterMessage = (params: BeaconEnterMessageParams = {}): Message => ({
  type: 'flex',
  altText: 'Beacon Enter',
  contents: {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'image',
              url: 'https://vos.line-scdn.net/lon-msg-icons/check-circle_bold%20%281%29.png',
            },
            {
              type: 'text',
              text: 'Checked in!',
              weight: 'bold',
              align: 'center',
              size: 'xl',
              margin: 'sm',
            },
          ],
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: 'LINE API for Developers x Generative AI',
              weight: 'bold',
              size: 'xl',
              wrap: true,
            },
          ],
          margin: 'lg',
        },
        {
          type: 'box',
          layout: 'vertical',
          margin: 'lg',
          spacing: 'sm',
          contents: [
            {
              type: 'box',
              layout: 'horizontal',
              spacing: 'sm',
              contents: [
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: 'Venue',
                      color: '#aaaaaa',
                      size: 'sm',
                    },
                  ],
                  width: '48px',
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: 'Data First Co., Ltd., Dee Dar Bar Floor 1',
                      wrap: true,
                      color: '#666666',
                      size: 'sm',
                    },
                  ],
                  flex: 1,
                },
              ],
            },
            {
              type: 'box',
              layout: 'horizontal',
              spacing: 'sm',
              contents: [
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: 'Date',
                      color: '#aaaaaa',
                      size: 'sm',
                    },
                  ],
                  width: '48px',
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: 'Sep 29th, 2024',
                      wrap: true,
                      color: '#666666',
                      size: 'sm',
                    },
                  ],
                  flex: 1,
                },
              ],
            },
          ],
        },
      ],
    },
  },
})

export const InEventMessages = (text: string): Message[] => {
  switch (text) {
    case 'ห้องน้ำ':
      return [{ type: 'text', text: 'ห้องน้ำอยู่ด้านหลังของอาคารครับ' }]
    case 'ที่จอดรถ':
      return [{ type: 'text', text: 'ที่จอดรถอยู่ด้านหน้าของอาคารครับ' }]
    default:
      return []
  }
}

export const AutoMessages = (text: string): Message[] => {
  switch (text) {
    case 'ห้องน้ำ':
      return [{ type: 'text', text: 'ฉันไม่รู้คุณอยู่ที่ไหน' }]
    default:
      return []
  }
}
