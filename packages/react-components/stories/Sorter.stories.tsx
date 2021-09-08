import {Meta, Story} from '@storybook/react'
import React from 'react'
import TableSorter from '../src/Table/TableSorter'

export default {
  title: 'TableSorter',
  component: TableSorter,
  parameters: {
    backgrounds: {
      default: 'white',
      values: [{name: 'white', value: '#ffffff'}],
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof TableSorter>> = (args) => (
  <TableSorter {...args} />
)

export const primary = Template.bind({})

primary.args = {
  children: ' TableSorter',
}
