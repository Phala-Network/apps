import {Meta, Story} from '@storybook/react'
import React from 'react'
import {Input} from '../src/Input'

export default {
  title: 'Input',
  component: Input,
  parameters: {
    backgrounds: {
      default: 'white',
      values: [{name: 'white', value: '#ffffff'}],
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof Input>> = (args) => (
  <Input {...args} />
)

export const primary = Template.bind({})

primary.args = {
  children: 'Primary Input',
}
