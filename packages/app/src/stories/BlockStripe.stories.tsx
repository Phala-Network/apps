import React from 'react'
import { Story, Meta } from '@storybook/react'
import BlockStripe from '../components/BlockStripe'

export default {
  title: 'BlockStripe',
  component: BlockStripe,
  argTypes: {
    color: { control: 'color' },
    backgroundColor: { control: 'color' },
  },
  parameters: {
    backgrounds: {
      default: 'black',
      values: [
        { name: 'black', value: '#202020' },
        { name: 'white', value: '#FFFFFF' },
        { name: 'gray', value: '#ECECEC' },
      ],
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof BlockStripe>> = (args) => (
  <BlockStripe {...args} />
)

export const Normal = Template.bind({})

Normal.args = {
  color: '#03ffff',
  backgroundColor: '#202020',
  blockSize: 12,
  column: 40,
  row: 40,
}

export const Primary = Template.bind({})

Primary.args = {
  color: '#ECECEC',
  backgroundColor: '#202020',
  blockSize: 4,
  column: 4,
  row: 40,
}

export const colorCheck = Template.bind({})

colorCheck.args = {
  color: '#ECECEC',
  backgroundColor: '#202020',
  colorCheck(status, index) {
    return index < 30 ? true : status > 0.6
  },
  blockSize: 4,
  column: 40,
  row: 4,
}
