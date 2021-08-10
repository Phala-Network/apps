import React from 'react'
import { Story, Meta } from '@storybook/react'
import TradeTypeSelect from '../components/TradeTypeSelect'

export default {
  title: 'TradeTypeSelect',
  component: TradeTypeSelect,
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

const Template: Story<React.ComponentProps<typeof TradeTypeSelect>> = (
  args
) => (
  <div style={{ width: 416 }}>
    <TradeTypeSelect {...args} />
  </div>
)

export const normal = Template.bind({})

normal.args = {}
