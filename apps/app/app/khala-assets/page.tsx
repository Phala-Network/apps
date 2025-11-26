import type {Metadata} from 'next'
import KhalaAssetsContent from './content'

export const metadata: Metadata = {
  title: 'Claim Phala/Khala Assets',
  description:
    'Claim your Phala and Khala assets on Ethereum after chain termination.',
}

export default function KhalaAssetsPage() {
  return <KhalaAssetsContent />
}
