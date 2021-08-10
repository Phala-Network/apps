import React from 'react'
import { Story, Meta } from '@storybook/react'
import QRCode from '../components/QRCode'

export default {
  title: 'QRCode',
  component: QRCode,
  parameters: {
    backgrounds: {
      default: 'white',
      values: [{ name: 'white', value: '#ffffff' }],
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof QRCode>> = (args) => (
  <QRCode {...args} />
)

export const primary = Template.bind({})

primary.args = {
  value: 'Primary QRCode',
}
