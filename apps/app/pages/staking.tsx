import PageHeader from '@/components/PageHeader'
import Staking from '@/components/Staking'
import {Web3Provider} from '@/components/Web3Provider'
import {ConnectKitButton} from 'connectkit'
import type {GetServerSideProps, InferGetServerSidePropsType} from 'next'

const Page = ({
  cookie,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Web3Provider cookie={cookie}>
      <PageHeader title="Staking">
        <ConnectKitButton showBalance />
      </PageHeader>
      <Staking />
    </Web3Provider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    notFound: process.env.VERCEL_ENV === 'production',
    props: {
      cookie: ctx.req.headers.cookie,
    },
  }
}

export default Page
