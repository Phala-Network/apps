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
      <Stack maxWidth={450} mx="auto" alignItems="center" mt={6} gap={4}>
        <Typography variant="h4">Claim Khala Assets</Typography>
        <Paper sx={{background: 'transparent', p: 3, width: '100%'}}>
          <ClaimKhalaAssets />
        </Paper>
        <Paper sx={{background: 'transparent', p: 3, width: '100%'}}>
          <Stack gap={1}>
            <Typography variant="h5">FAQ</Typography>
            <Typography variant="body1">
              How to claim with multisig account?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Due to the multisig account's inability to verify signatures,
              please contact us on Discord, and we will assist you manually with
              the claim.
            </Typography>
            <Typography variant="body1" sx={{mt: 2}}>
              How to claim with Ledger or other hardware wallets?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We are currently testing the Ledger hardware wallet, you can claim
              it anytime once it's ready.
            </Typography>
            <Typography variant="body1" sx={{mt: 2}}>
              I can't connect my Khala wallet and Ethereum wallet at the same
              time.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We are preparing a new version to facilitate claiming with
              different devices.
            </Typography>
          </Stack>
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
