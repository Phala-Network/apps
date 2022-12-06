import NftsIcon from '@/assets/nfts.svg'
import {FC} from 'react'
import SectionHeader from './SectionHeader'

const DashboardNftList: FC = () => {
  return (
    <>
      <SectionHeader title="NFTs" icon={<NftsIcon />}></SectionHeader>
    </>
  )
}

export default DashboardNftList
