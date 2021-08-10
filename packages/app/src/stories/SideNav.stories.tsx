import React from 'react'
import { Story, Meta } from '@storybook/react'
import SideNav from '../components/SideNav'

export default {
  title: 'SideNav',
  component: SideNav,
  parameters: {
    backgrounds: {
      default: 'white',
      values: [{ name: 'white', value: '#ffffff' }],
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof SideNav>> = (args) => (
  <SideNav {...args} />
)

export const primary = Template.bind({})

primary.args = {
  children: 'Primary SideNav',
}
