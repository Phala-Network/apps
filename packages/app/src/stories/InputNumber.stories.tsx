import React from 'react'
import { Story, Meta } from '@storybook/react'
import InputNumber from '../components/InputNumber'
import InputAction from '../components/InputAction'

export default {
  title: 'InputNumber',
  component: InputNumber,
  parameters: {
    backgrounds: {
      default: 'white',
      values: [
        { name: 'black', value: '#202020' },
        { name: 'white', value: '#FFFFFF' },
        { name: 'gray', value: '#ECECEC' },
      ],
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof InputNumber>> = (args) => (
  <InputNumber {...args} />
)

export const primary = Template.bind({})

primary.args = {
  placeholder: 'InputNumber',
  after: <InputAction>Max</InputAction>,
}
