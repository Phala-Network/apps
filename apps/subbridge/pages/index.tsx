import BridgeBody from '@/components/BridgeBody'
import {Container, useTheme} from '@mui/material'
import type {NextPage} from 'next'
import dynamic from 'next/dynamic'

const PolkadotWalletDialog = dynamic(
  () => import('@/components/PolkadotWalletDialog'),
  {ssr: false}
)

const Home: NextPage = () => {
  const theme = useTheme()
  return (
    <Container>
      <BridgeBody
        sx={{
          mt: 12,
          maxWidth: `calc(${theme.breakpoints.values.sm}px - ${theme.spacing(
            3
          )} * 2)`,
          mx: 'auto',
          [theme.breakpoints.down('sm')]: {
            mt: 9,
          },
        }}
      />

      <PolkadotWalletDialog />
    </Container>
  )
}

export default Home
