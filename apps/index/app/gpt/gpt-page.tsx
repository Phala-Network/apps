'use client'
import GPT from '@/components/GPT'
import PolkadotWalletDialog from '@/components/PolkadotWalletDialog'
import {useEthereumProviderInitialization} from '@/hooks/useEthereumProviderInitialization'
import {useIndexClientInitialization} from '@/hooks/useIndexClientInitialization'
import {useValidation} from '@/hooks/useValidation'
import {clientAtom} from '@/store/core'
import {CircularProgress, Container, Stack} from '@mui/material'
import {useConnectPolkadotWallet} from '@phala/utils'
import {useAtom} from 'jotai'
import type {NextPage} from 'next'

const GPTPage: NextPage = () => {
  const [client] = useAtom(clientAtom)
  useEthereumProviderInitialization()
  useConnectPolkadotWallet('inDEX')
  useValidation()
  useIndexClientInitialization()
  return (
    <Container sx={{pt: {sm: 9, md: 12}}}>
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

export default GPTPage
