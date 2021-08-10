import React from 'react'
import { Story, Meta } from '@storybook/react'
import Button from '../components/Button'

export default {
  title: 'Button',
  component: Button,
  parameters: {
    backgrounds: {
      default: 'white',
      values: [{ name: 'white', value: '#ffffff' }],
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof Button>> = (args) => (
  <Button {...args} />
)

export const primary = Template.bind({})

primary.args = {
  children: 'Primary Button',
  type: 'primary',
}

export const Normal = Template.bind({})

Normal.args = {
  children: 'Normal Button',
  type: 'normal',
}

export const Round = Template.bind({})

Round.args = {
  children: 'Round Button',
  type: 'primary',
  shape: 'round',
}
