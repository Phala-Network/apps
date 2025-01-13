import PageHeader from '@/components/PageHeader'
import Staking from '@/components/Staking'
import {Chip} from '@mui/material'
import {ConnectButton} from '@rainbow-me/rainbowkit'

const Page = () => {
  return (
    <>
      <PageHeader
        title="Staking"
        pageTitle={
          <>
            Staking <Chip label="Ethereum" color="info" variant="outlined" />
          </>
        }
      >
        <ConnectButton />
      </PageHeader>
      <Staking />
    </>
  )
}
export default Page
