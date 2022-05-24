import {
  ethersBalanceFetcher,
  ethersContractBalanceFetcher,
} from '@/lib/ethersFetcher'
import {
  khalaTokenBalanceFetcher,
  ormlTokenBalanceFetcher,
  polkadotAvailableBalanceFetcher,
} from '@/lib/polkadotFetcher'
import {assetAtom, decimalsAtom, fromChainAtom} from '@/store/bridge'
import {ethersProviderAtom, evmAccountAtom} from '@/store/ethers'
import {polkadotAccountAtom} from '@phala/store'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import useSWR from 'swr'
import {useEthersContract} from './useEthersContract'
import {useCurrentPolkadotApi} from './usePolkadotApi'

const refreshInterval = 12000

export const useBalance = (): Decimal | undefined => {
  const [fromChain] = useAtom(fromChainAtom)
  const [asset] = useAtom(assetAtom)
  const [polkadotAccount] = useAtom(polkadotAccountAtom)
  const [evmAccount] = useAtom(evmAccountAtom)
  const [decimals] = useAtom(decimalsAtom)
  const [ethersProvider] = useAtom(ethersProviderAtom)
  const polkadotApi = useCurrentPolkadotApi()
  const ethersAssetContract = useEthersContract('assetContract')

  const fromKarura =
    (fromChain.id === 'karura' || fromChain.id === 'karura-test') &&
    asset.id !== fromChain.nativeAsset &&
    asset.ormlToken !== undefined
  const fromKhala =
    (fromChain.id === 'khala' || fromChain.id === 'thala') &&
    asset.id !== fromChain.nativeAsset &&
    asset.khalaPalletAssetId !== undefined
  const fromPolkadotNativeChain =
    fromChain.kind === 'polkadot' && fromChain.nativeAsset === asset.id
  const fromEvmNativeChain =
    fromChain.kind === 'evm' && fromChain.nativeAsset === asset.id
  const fromBifrost =
    (fromChain.id === 'bifrost' || fromChain.id === 'bifrost-test') &&
    asset.id !== fromChain.nativeAsset &&
    asset.ormlToken !== undefined
  const fromEvm = fromChain.kind === 'evm'

  const {data: ormlTokenBalance} = useSWR(
    (fromKarura || fromBifrost) && polkadotAccount
      ? [polkadotApi, polkadotAccount.address, asset.ormlToken, decimals]
      : null,
    ormlTokenBalanceFetcher,
    {refreshInterval}
  )
  const {data: khalaTokenBalance} = useSWR(
    fromKhala && polkadotAccount
      ? [
          polkadotApi,
          polkadotAccount.address,
          asset.khalaPalletAssetId,
          decimals,
        ]
      : null,
    khalaTokenBalanceFetcher,
    {refreshInterval}
  )
  const {data: polkadotNativeChainBalance} = useSWR(
    fromPolkadotNativeChain && polkadotAccount
      ? [polkadotApi, polkadotAccount.address]
      : null,
    polkadotAvailableBalanceFetcher,
    {refreshInterval}
  )
  const {data: evmNativeBalance} = useSWR(
    fromEvmNativeChain && evmAccount && ethersProvider
      ? [ethersProvider, evmAccount]
      : null,
    ethersBalanceFetcher,
    {refreshInterval}
  )
  const {data: ethersContractBalance} = useSWR(
    ethersAssetContract && evmAccount
      ? [ethersAssetContract, evmAccount, decimals]
      : null,
    ethersContractBalanceFetcher,
    {refreshInterval}
  )

  const balance: Decimal | undefined =
    ((fromKarura || fromBifrost) && ormlTokenBalance) ||
    (fromKhala && khalaTokenBalance) ||
    (fromEvmNativeChain && evmNativeBalance) ||
    (fromPolkadotNativeChain && polkadotNativeChainBalance) ||
    (fromEvm && ethersContractBalance) ||
    undefined

  return balance
}
