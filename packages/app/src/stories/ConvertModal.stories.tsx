import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import ConvertModal from '../components/ConvertModal'

export default {
  title: 'ConvertModal',
  component: ConvertModal,
  parameters: {
    backgrounds: {
      default: 'gray',
      values: [{ name: 'gray', value: '#ECECEC' }],
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof ConvertModal>> = () => {
  const [visible, setVisible] = useState(true)

  return <ConvertModal visible={visible} onClose={() => setVisible(false)} />
}

export const primary = Template.bind({})
