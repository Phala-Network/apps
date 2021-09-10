import {Meta, Story} from '@storybook/react'
import React from 'react'
import {Modal} from '../src/Modal'

export default {
  title: 'Modal',
  component: Modal,
  parameters: {
    backgrounds: {
      default: 'gray',
      values: [{name: 'gray', value: '#ECECEC'}],
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
