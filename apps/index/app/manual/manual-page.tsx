'use client'
import Body from '@/components/Body'
import Confirmation from '@/components/Confirmation'
import Footer from '@/components/Footer'
import PolkadotWalletDialog from '@/components/PolkadotWalletDialog'
import Progress from '@/components/Progress'
import TopBar from '@/components/TopBar'
import {useEthereumProviderInitialization} from '@/hooks/useEthereumProviderInitialization'
import {useIndexClientInitialization} from '@/hooks/useIndexClientInitialization'
import {useValidation} from '@/hooks/useValidation'
import {clientAtom} from '@/store/core'
import {Box, CircularProgress, Container, Stack, useTheme} from '@mui/material'
import {useConnectPolkadotWallet} from '@phala/utils'
import {useAtom} from 'jotai'
import type {NextPage} from 'next'

const ManualPage: NextPage = () => {
  const theme = useTheme()
  const [client] = useAtom(clientAtom)
  useEthereumProviderInitialization()
  useConnectPolkadotWallet('inDEX')
  useValidation()
  useIndexClientInitialization()
  return (
    <>
      <TopBar />
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
    </>
  )
}

export default ManualPage
