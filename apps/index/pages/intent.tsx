import Intent from '@/components/Intent'
import {clientAtom} from '@/store/core'
import {CircularProgress, Container, Stack} from '@mui/material'
import {useAtom} from 'jotai'
import type {NextPage} from 'next'
import dynamic from 'next/dynamic'

const PolkadotWalletDialog = dynamic(
  async () => await import('@/components/PolkadotWalletDialog'),
  {ssr: false},
)

const Home: NextPage = () => {
  const [client] = useAtom(clientAtom)
  return (
    <Container sx={{pt: {sm: 9, md: 12}}}>
      {client == null ? (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      ) : (
        <Intent />
      )}

      <PolkadotWalletDialog />
    </Container>
  )
}

export default Home
