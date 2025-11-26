import type {Metadata} from 'next'
import GpuMiningContent from './content'

export const metadata: Metadata = {
  title: 'GPU Mining',
  description:
    'Start mining with your GPU on the Phala Network. Manage stake pools and monitor mining operations.',
}

export default function GpuMiningPage() {
  return <GpuMiningContent />
}
