import type {Metadata} from 'next'

import HomeContent from './content'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Manage your PHA assets - stake, bridge, swap and claim your Phala tokens',
}

export default function HomePage() {
  return <HomeContent />
}
