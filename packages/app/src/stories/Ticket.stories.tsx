import React from 'react'
import { Story, Meta } from '@storybook/react'
import Ticket from '../components/Ticket'
import BlockStripe from '../components/BlockStripe'

export default {
  title: 'Ticket',
  component: Ticket,
  argTypes: {
    color: { control: 'color' },
    backgroundColor: { control: 'color' },
  },
  parameters: {
    backgrounds: {
      default: 'gray',
      values: [{ name: 'gray', value: '#ECECEC' }],
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof Ticket>> = (args) => (
  <Ticket {...args} />
)

export const active = Template.bind({})

active.args = {
  no: '0xC28C2D8769A20C2002E',
  name: 'Khala',
  active: true,
  bottomContent: (
    <BlockStripe
      {...{
        color: '#ECECEC',
        backgroundColor: '#202020',
        blockSize: 4,
        column: 40,
        row: 4,
        random: 0.5,
      }}
    />
  ),
}

export const Normal = Template.bind({})

Normal.args = {
  no: '0xC28C2D8769A20C2002E',
  name: 'Ethereum',
  active: false,
  bottomContent: (
    <div>
      <span>442,236,966</span>
    </div>
  ),
}
