import Body from '@/components/Body'
import Footer from '@/components/Footer'
import {fetchConfig, type Config} from '@/lib/fetchConfig'
import {Box, Container, useTheme} from '@mui/material'
import type {GetServerSideProps, NextPage} from 'next'
import dynamic from 'next/dynamic'

const PolkadotWalletDialog = dynamic(
  async () => await import('@/components/PolkadotWalletDialog'),
  {ssr: false},
)

export interface Props {
  config: Config
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const config = await fetchConfig()

  return {props: {config}}
}

const Home: NextPage<Props> = ({config}) => {
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
        <Body />

        <Box sx={{my: 4}}>
          <Footer />
        </Box>
      </Box>

      <PolkadotWalletDialog />
    </Container>
  )
}

export default Home
