import React from 'react'
import { Story, Meta } from '@storybook/react'
import TableAction from '../components/Table/TableAction'

export default {
  title: 'TableAction',
  component: TableAction,
  parameters: {
    backgrounds: {
      default: 'white',
      values: [{ name: 'white', value: '#ffffff' }],
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof TableAction>> = (args) => (
  <TableAction {...args} />
)

export const primary = Template.bind({})

primary.args = {
  children: ' TableAction',
}
