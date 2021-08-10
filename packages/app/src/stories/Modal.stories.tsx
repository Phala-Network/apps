import React from 'react'
import { Story, Meta } from '@storybook/react'
import Modal from '../components/Modal'

export default {
  title: 'Modal',
  component: Modal,
  parameters: {
    backgrounds: {
      default: 'gray',
      values: [{ name: 'gray', value: '#ECECEC' }],
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof Modal>> = (args) => (
  <Modal {...args} />
)

export const active = Template.bind({})

active.args = {
  visible: true,
  title: 'Modal Title',
}
