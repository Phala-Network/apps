import {ethersContractBalanceFetcher} from '@/lib/ethersFetcher'
import {
  karuraTokenBalanceFetcher,
  polkadotAvailableBalanceFetcher,
} from '@/lib/polkadotFetcher'
import {assetAtom, decimalsAtom, fromChainAtom} from '@/store/bridge'
import {evmAccountAtom} from '@/store/ethers'
import {polkadotAccountAtom} from '@phala/store'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import useSWR from 'swr'
import {useEthersContract} from './useEthersContract'
import {useCurrentPolkadotApi} from './usePolkadotApi'

export const useBalance = (): Decimal | undefined => {
  const [fromChain] = useAtom(fromChainAtom)
  const [asset] = useAtom(assetAtom)
  const [polkadotAccount] = useAtom(polkadotAccountAtom)
  const [evmAccount] = useAtom(evmAccountAtom)
  const [decimals] = useAtom(decimalsAtom)
  const polkadotApi = useCurrentPolkadotApi()
  const ethersAssetContract = useEthersContract('assetContract')

  const fromKarura =
    (fromChain.id === 'karura' || fromChain.id === 'karura-test') &&
    asset.karuraToken !== undefined
  const fromNativeChain =
    fromChain.kind === 'polkadot' && fromChain.nativeAsset === asset.id
  const fromEvm = fromChain.kind === 'evm'

  const {data: karuraTokenBalance} = useSWR(
    fromKarura && polkadotAccount
      ? [polkadotApi, polkadotAccount.address, asset.karuraToken, decimals]
      : null,
    karuraTokenBalanceFetcher,
    {
      refreshInterval: 12000,
    }
  )
  const {data: nativeChainBalance} = useSWR(
    fromNativeChain && polkadotAccount
      ? [polkadotApi, polkadotAccount.address]
      : null,
    polkadotAvailableBalanceFetcher,
    {
      refreshInterval: 12000,
    }
  )
  const {data: ethersContractBalance} = useSWR(
    ethersAssetContract && evmAccount
      ? [ethersAssetContract, evmAccount, decimals]
      : null,
    ethersContractBalanceFetcher,
    {
      refreshInterval: 12000,
    }
  )

  const balance: Decimal | undefined =
    (fromKarura && karuraTokenBalance) ||
    (fromNativeChain && nativeChainBalance) ||
    (fromEvm && ethersContractBalance) ||
    undefined

  return balance
}
