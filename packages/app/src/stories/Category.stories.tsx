import React from 'react'
import { Story, Meta } from '@storybook/react'
import Category from '../components/Category'
import BalanceCard from '../components/BalanceCard'
import { PrimaryHeader } from '../components/BalanceCard/Header'

export default {
  title: 'Category',
  component: Category,
  parameters: {
    backgrounds: {
      default: 'gray',
      values: [{ name: 'gray', value: '#ECECEC' }],
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof Category>> = () => {
  const card = (
    <BalanceCard
      {...{
        balance: 888.8888,
        themeType: 'black',
        header: <PrimaryHeader>ePHA</PrimaryHeader>,
      }}
    />
  )

  return (
    <>
      <Category title='Title1' description={'description'}>
        {card}
        {card}
        {card}
        {card}
        {card}
        {card}
        {card}
      </Category>
      <Category title='Title2' description='description'>
        {card}
        {card}
        {card}
        {card}
        {card}
      </Category>
      <Category title='Title3' description='description'>
        {card}
      </Category>
    </>
  )
}

export const primary = Template.bind({})
