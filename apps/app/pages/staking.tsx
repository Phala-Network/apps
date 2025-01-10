import PageHeader from '@/components/PageHeader'
import Staking from '@/components/Staking'
import {Web3Provider} from '@/components/Web3Provider'
import {Chip} from '@mui/material'
import {ConnectButton} from '@rainbow-me/rainbowkit'
import type {GetServerSideProps, InferGetServerSidePropsType} from 'next'

const Page = ({
  cookie,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Web3Provider cookie={cookie}>
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
    </Web3Provider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    // notFound: process.env.NODE_ENV === 'production',
    props: {
      cookie: ctx.req.headers.cookie,
    },
  }
}

export default Page
