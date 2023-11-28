'use client'
import {assets} from '@/config/common'
import {useEthersBrowserProvider} from '@/hooks/useEthersProvider'
import {useSwitchNetwork} from '@/hooks/useSwitchNetwork'
import {ethersBalanceFetcher} from '@/lib/ethersFetcher'
import {fromChainAtom} from '@/store/core'
import {evmAccountAtom, isNetworkWrongAtom} from '@/store/ethers'
import {Button} from '@mui/material'
import {toCurrency, trimAddress} from '@phala/utils'
import {useAtom} from 'jotai'
import {useSnackbar} from 'notistack'
import {useMemo, type FC} from 'react'
import useSWR from 'swr'
import AccountTemplate from './AccountTemplate'

const EvmAccount: FC = () => {
  const {enqueueSnackbar} = useSnackbar()
  const [fromChain] = useAtom(fromChainAtom)
  const [evmAccount] = useAtom(evmAccountAtom)
  const ethersBrowserProvider = useEthersBrowserProvider()
  const [isNetworkWrong] = useAtom(isNetworkWrongAtom)
  const switchNetwork = useSwitchNetwork()
  const {data} = useSWR(
    evmAccount != null &&
      ethersBrowserProvider != null && [ethersBrowserProvider, evmAccount],
    ethersBalanceFetcher,
    {refreshInterval: 12000},
  )

  const symbol = useMemo(
    () =>
      assets.find(
        (x) =>
          x.chainId === fromChain?.name && x.location === fromChain.nativeAsset,
      )?.symbol,
    [fromChain],
  )

  if (evmAccount == null) return null

  return (
    <AccountTemplate
      account={trimAddress(evmAccount)}
      balance={
        fromChain?.chainType === 'Evm' &&
        (isNetworkWrong ? (
          <Button
            variant="text"
            size="small"
            color="error"
            onClick={() => {
              void switchNetwork()
            }}
          >
            Wrong Network
          </Button>
        ) : (
          // FIXME: remove hardcode
          data != null && `${toCurrency(data)} ${symbol ?? 'GLMR'}`
        ))
      }
      ButtonProps={{
        onClick: () => {
          enqueueSnackbar('You can switch accounts in the wallet.')
        },
      }}
    />
  )
}

export default EvmAccount
