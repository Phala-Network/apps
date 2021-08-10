import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import TransferModal from '../components/TransferModal'

export default {
  title: 'TransferModal',
  component: TransferModal,
  parameters: {
    backgrounds: {
      default: 'gray',
      values: [{ name: 'gray', value: '#ECECEC' }],
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof TransferModal>> = () => {
  const [visible, setVisible] = useState(true)

  return <TransferModal visible={visible} onClose={() => setVisible(false)} />
}

export const primary = Template.bind({})
