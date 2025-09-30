import BridgeBody from '@/components/BridgeBody'
import BridgeHistory from '@/components/BridgeHistory'
import Footer from '@/components/Footer'
import KhalaSunsetAlert from '@/components/KhalaSunsetAlert'
import {Box, Container, useTheme} from '@mui/material'
import type {NextPage} from 'next'
import dynamic from 'next/dynamic'

const PolkadotWalletDialog = dynamic(
  async () => await import('@/components/PolkadotWalletDialog'),
  {ssr: false},
)

const Home: NextPage = () => {
  const theme = useTheme()
  return (
    <Container
      sx={{
        pt: 12,
        [theme.breakpoints.down('sm')]: {
          pt: 9,
        },
      }}
    >
      <Box
        sx={{
          maxWidth: `calc(${theme.breakpoints.values.sm}px - ${theme.spacing(
            3,
          )} * 2)`,
          mx: 'auto',
        }}
      >
        <KhalaSunsetAlert sx={{mb: 2}} />

        <BridgeBody />

        <BridgeHistory pt={3} />

        <Box sx={{my: 4}}>
          <Footer />
        </Box>
      </Box>

      <PolkadotWalletDialog />
    </Container>
  )
}

export default Home
