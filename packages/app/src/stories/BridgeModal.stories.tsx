import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import BridgeModal from '../components/BridgeModal'

export default {
  title: 'BridgeModal',
  component: BridgeModal,
  parameters: {
    backgrounds: {
      default: 'white',
      values: [{ name: 'white', value: '#ffffff' }],
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof BridgeModal>> = () => {
  const [visibleBridge, setVisibleBridge] = useState(true)

  return (
    <BridgeModal
      visible={visibleBridge}
      onClose={() => setVisibleBridge(false)}
    />
  )
}

export const primary = Template.bind({})
