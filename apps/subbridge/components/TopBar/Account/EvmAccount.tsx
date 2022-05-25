import {useEthersProvider} from '@/hooks/useEthersProvider'
import {useSwitchNetwork} from '@/hooks/useSwitchNetwork'
import {ethersBalanceFetcher} from '@/lib/ethersFetcher'
import {fromChainAtom} from '@/store/bridge'
import {evmAccountAtom, isNetworkWrongAtom} from '@/store/ethers'
import {Button} from '@mui/material'
import {formatCurrency, trimAddress} from '@phala/utils'
import {useAtom} from 'jotai'
import {useSnackbar} from 'notistack'
import {FC} from 'react'
import useSWR from 'swr'
import AccountTemplate from './AccountTemplate'

const EvmAccount: FC = () => {
  const {enqueueSnackbar} = useSnackbar()
  const [fromChain] = useAtom(fromChainAtom)
  const [evmAccount] = useAtom(evmAccountAtom)
  const ethersProvider = useEthersProvider()
  const [isNetworkWrong] = useAtom(isNetworkWrongAtom)
  const switchNetwork = useSwitchNetwork()
  const {data} = useSWR(
    evmAccount && ethersProvider ? [ethersProvider, evmAccount] : null,
    ethersBalanceFetcher,
    {refreshInterval: 12000}
  )

  if (!evmAccount) return null

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
            onClick={() => switchNetwork()}
          >
            Wrong Network
          </Button>
        ) : (
          data && `${formatCurrency(data)} ${fromChain.currencySymbol}`
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
