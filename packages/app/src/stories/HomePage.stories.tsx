import { Story, Meta } from '@storybook/react'
import HomePage from '../components/pages/HomePage'

export default {
  title: 'HomePage',
  component: HomePage,
  parameters: {
    backgrounds: {
      default: 'gray',
      values: [{ name: 'gray', value: '#ECECEC' }],
    },
  },
} as Meta

export const demo: Story = () => <HomePage></HomePage>
