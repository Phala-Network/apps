import ClaimKhalaAssets from '@/components/ClaimKhalaAssets'
import Title from '@/components/Title'
import {Web3Provider} from '@/components/Web3Provider'
import {Paper, Stack, Typography} from '@mui/material'
import type {GetServerSideProps} from 'next'
import type {InferGetServerSidePropsType} from 'next'

const Page = ({
  cookie,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Web3Provider cookie={cookie}>
      <Title>Claim Khala Assets</Title>
      <Stack maxWidth={400} mx="auto" alignItems="center" mt={6} gap={4}>
        <Typography variant="h4">Claim Khala Assets</Typography>
        <Paper sx={{background: 'transparent', p: 2, width: '100%'}}>
          <ClaimKhalaAssets />
        </Paper>
      </Stack>
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
