import BridgeBody from '@/components/BridgeBody'
import {ClientOnly} from '@/components/ClientOnly'
import Footer from '@/components/Footer'
import MigrationAlert from '@/components/MigrationAlert'
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
        <ClientOnly>
          <MigrationAlert sx={{mb: 2}} />
        </ClientOnly>

        <BridgeBody />

        <Box sx={{my: 4}}>
          <Footer />
        </Box>
      </Box>

      <PolkadotWalletDialog />
    </Container>
  )
}

export default Home
