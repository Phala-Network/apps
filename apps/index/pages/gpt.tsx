import GPT from '@/components/GPT'
import {clientAtom} from '@/store/core'
import {CircularProgress, Container, Stack} from '@mui/material'
import {useAtom} from 'jotai'
import type {NextPage} from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const PolkadotWalletDialog = dynamic(
  async () => await import('@/components/PolkadotWalletDialog'),
  {ssr: false},
)

const Home: NextPage = () => {
  const [client] = useAtom(clientAtom)
  return (
    <Container sx={{pt: {sm: 9, md: 12}}}>
      <Head>
        <title>inDEX GPT</title>
      </Head>
      {client == null ? (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      ) : (
        <GPT />
      )}

      <PolkadotWalletDialog />
    </Container>
  )
}

export default Home
