import type {Metadata} from 'next'
import StakingContent from './content'

export const metadata: Metadata = {
  title: 'Staking',
  description: 'Stake PHA tokens on Ethereum with SLPx',
}

export default function StakingPage() {
  return <StakingContent />
}
