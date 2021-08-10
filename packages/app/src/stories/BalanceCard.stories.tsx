import React from 'react'
import { Story, Meta } from '@storybook/react'
import {
  BlackHeader,
  PrimaryHeader,
  WhiteHeader,
  StripeHeader,
} from '../components/BalanceCard/Header'
import BalanceCard from '../components/BalanceCard'

export default {
  title: 'BalanceCard',
  component: BalanceCard,
  parameters: {
    backgrounds: {
      default: 'gray',
      values: [{ name: 'gray', value: '#ECECEC' }],
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof BalanceCard>> = (args) => (
  <div
    style={{
      height: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <BalanceCard {...args} />
  </div>
)

export const black = Template.bind({})

black.args = {
  balance: 12345.6789,
  themeType: 'black',
  header: <WhiteHeader>GRAPH</WhiteHeader>,
}

export const white = Template.bind({})

white.args = {
  balance: 12345.6789,
  themeType: 'white',
  header: <BlackHeader>GRAPH</BlackHeader>,
}

export const primaryHeader = Template.bind({})

primaryHeader.args = {
  balance: 888.8888,
  themeType: 'black',
  header: <PrimaryHeader>ePHA</PrimaryHeader>,
}

export const stripeHeader = Template.bind({})

stripeHeader.args = {
  balance: 888.8888,
  themeType: 'black',
  header: <StripeHeader>ePHA</StripeHeader>,
}
