import Body from '@/components/Body'
import Footer from '@/components/Footer'
import Progress from '@/components/Progress'
import {clientAtom} from '@/store/core'
import {Box, CircularProgress, Container, Stack, useTheme} from '@mui/material'
import {useAtom} from 'jotai'
import type {NextPage} from 'next'
import dynamic from 'next/dynamic'
import Confirmation from '@/components/Confirmation'

const PolkadotWalletDialog = dynamic(
  async () => await import('@/components/PolkadotWalletDialog'),
  {ssr: false},
)

const Home: NextPage = () => {
  const theme = useTheme()
  const [client] = useAtom(clientAtom)
  return (
    <Container sx={{pt: {sm: 9, md: 12}}}>
      {client == null ? (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      ) : (
        <Stack
          direction={{sm: 'column', lg: 'row'}}
          alignItems={{sm: 'center', lg: 'flex-start'}}
          spacing={3}
        >
          <Box
            sx={{
              maxWidth: `calc(${
                theme.breakpoints.values.sm
              }px - ${theme.spacing(3)} * 2)`,
              flexShrink: 0,
            }}
          >
            <Body />

            <Box sx={{my: 4}}>
              <Footer />
            </Box>
          </Box>

          <Progress sx={{flex: 1}} />
        </Stack>
      )}

      <Confirmation></Confirmation>

      <PolkadotWalletDialog />
    </Container>
  )
}

export default Home
