import ClaimKhalaAssets from '@/components/ClaimKhalaAssets'
import PageHeader from '@/components/PageHeader'
import {Web3Provider} from '@/components/Web3Provider'
import type {GetServerSideProps} from 'next'
import type {InferGetServerSidePropsType} from 'next'

const Page = ({
  cookie,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Web3Provider cookie={cookie}>
      <PageHeader title="Claim Khala Assets" />
      <ClaimKhalaAssets />
    </Web3Provider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    notFound: process.env.NODE_ENV === 'production',
    props: {cookie: ctx.req.headers.cookie},
  }
}

export default Page
