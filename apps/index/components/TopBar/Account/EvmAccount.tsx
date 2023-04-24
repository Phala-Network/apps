import {useEthersBrowserProvider} from '@/hooks/useEthersProvider'
import {useSwitchNetwork} from '@/hooks/useSwitchNetwork'
import {ethersBalanceFetcher} from '@/lib/ethersFetcher'
import {ChainType} from '@/lib/fetchConfig'
import {configAtom, fromChainAtom} from '@/store/core'
import {evmAccountAtom, isNetworkWrongAtom} from '@/store/ethers'
import {Button} from '@mui/material'
import {toCurrency, trimAddress} from '@phala/util'
import {useAtom} from 'jotai'
import {useSnackbar} from 'notistack'
import {type FC} from 'react'
import useSWR from 'swr'
import AccountTemplate from './AccountTemplate'

const EvmAccount: FC = () => {
  const {enqueueSnackbar} = useSnackbar()
  const [fromChain] = useAtom(fromChainAtom)
  const [config] = useAtom(configAtom)
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

  if (evmAccount == null) return null

  return (
    <AccountTemplate
      account={trimAddress(evmAccount)}
      balance={
        fromChain.chainType === ChainType.EVM &&
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
          data != null &&
          `${toCurrency(data)} ${config.assetMap[fromChain.nativeAsset].symbol}`
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
