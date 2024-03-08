import {useEthersWeb3Provider} from '@/hooks/useEthersProvider'
import {useSwitchNetwork} from '@/hooks/useSwitchNetwork'
import {ethersBalanceFetcher} from '@/lib/ethersFetcher'
import {fromChainAtom} from '@/store/bridge'
import {evmAccountAtom, isNetworkWrongAtom} from '@/store/ethers'
import {Button} from '@mui/material'
import {toCurrency, trimAddress} from '@phala/lib'
import {useAtom} from 'jotai'
import {useSnackbar} from 'notistack'
import type {FC} from 'react'
import useSWR from 'swr'
import AccountTemplate from './AccountTemplate'

const EvmAccount: FC = () => {
  const {enqueueSnackbar} = useSnackbar()
  const [fromChain] = useAtom(fromChainAtom)
  const [evmAccount] = useAtom(evmAccountAtom)
  const ethersWeb3Provider = useEthersWeb3Provider()
  const [isNetworkWrong] = useAtom(isNetworkWrongAtom)
  const switchNetwork = useSwitchNetwork()
  const {data} = useSWR(
    evmAccount != null &&
      ethersWeb3Provider != null && [ethersWeb3Provider, evmAccount],
    ethersBalanceFetcher,
    {refreshInterval: 12000},
  )

  if (evmAccount == null) return null

  return (
    <AccountTemplate
      account={trimAddress(evmAccount)}
      balance={
        fromChain.kind === 'evm' &&
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
          data != null && `${toCurrency(data)} ${fromChain.currencySymbol}`
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
