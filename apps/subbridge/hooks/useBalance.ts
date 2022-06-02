import {
  ethersBalanceFetcher,
  ethersContractBalanceFetcher,
} from '@/lib/ethersFetcher'
import {
  ormlTokenBalanceFetcher,
  palletAssetBalanceFetcher,
  polkadotAvailableBalanceFetcher,
} from '@/lib/polkadotFetcher'
import {assetAtom, decimalsAtom, fromChainAtom} from '@/store/bridge'
import {evmAccountAtom} from '@/store/ethers'
import {polkadotAccountAtom} from '@phala/store'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import useSWR from 'swr'
import {useEthersAssetContract} from './useEthersContract'
import {useEthersProvider} from './useEthersProvider'
import {useCurrentPolkadotApi} from './usePolkadotApi'

const refreshInterval = 12000

type BalanceSource =
  | 'ormlToken'
  | 'palletAsset'
  | 'polkadotNative'
  | 'evmBalance'
  | 'evmContract'
  | null

export const useBalance = (): Decimal | undefined => {
  const [fromChain] = useAtom(fromChainAtom)
  const [asset] = useAtom(assetAtom)
  const [polkadotAccount] = useAtom(polkadotAccountAtom)
  const [evmAccount] = useAtom(evmAccountAtom)
  const [decimals] = useAtom(decimalsAtom)
  const ethersProvider = useEthersProvider()
  const polkadotApi = useCurrentPolkadotApi()
  const ethersAssetContract = useEthersAssetContract()

  let balanceSource: BalanceSource = null

  if (
    (fromChain.id === 'karura' ||
      fromChain.id === 'karura-test' ||
      fromChain.id === 'bifrost' ||
      fromChain.id === 'bifrost-test') &&
    asset.id !== fromChain.nativeAsset &&
    asset.ormlToken !== undefined
  ) {
    balanceSource = 'ormlToken'
  } else if (
    (fromChain.id === 'khala' ||
      fromChain.id === 'thala' ||
      fromChain.id === 'parallel-heiko') &&
    asset.id !== fromChain.nativeAsset &&
    asset.palletAssetId?.[fromChain.id] !== undefined
  ) {
    balanceSource = 'palletAsset'
  } else if (
    fromChain.kind === 'polkadot' &&
    fromChain.nativeAsset === asset.id
  ) {
    balanceSource = 'polkadotNative'
  } else if (fromChain.kind === 'evm' && fromChain.nativeAsset === asset.id) {
    balanceSource = 'evmBalance'
  } else if (fromChain.kind === 'evm') {
    balanceSource = 'evmContract'
  }

  const {data: ormlTokenBalance} = useSWR(
    balanceSource === 'ormlToken' && polkadotAccount && asset.ormlToken
      ? [polkadotApi, polkadotAccount.address, asset.ormlToken, decimals]
      : null,
    ormlTokenBalanceFetcher,
    {refreshInterval}
  )
  const {data: palletAssetBalance} = useSWR(
    balanceSource === 'palletAsset' &&
      polkadotAccount &&
      asset.palletAssetId?.[fromChain.id]
      ? [
          polkadotApi,
          polkadotAccount.address,
          asset.palletAssetId[fromChain.id],
          decimals,
        ]
      : null,
    palletAssetBalanceFetcher,
    {refreshInterval}
  )
  const {data: polkadotNativeChainBalance} = useSWR(
    balanceSource === 'polkadotNative' && polkadotAccount
      ? [polkadotApi, polkadotAccount.address]
      : null,
    polkadotAvailableBalanceFetcher,
    {refreshInterval}
  )
  const {data: evmNativeBalance} = useSWR(
    balanceSource === 'evmBalance' && evmAccount && ethersProvider
      ? [ethersProvider, evmAccount]
      : null,
    ethersBalanceFetcher,
    {refreshInterval}
  )
  const {data: ethersContractBalance} = useSWR(
    balanceSource === 'evmContract' && evmAccount
      ? [ethersAssetContract, evmAccount, decimals]
      : null,
    ethersContractBalanceFetcher,
    {refreshInterval}
  )

  const balance: Decimal | undefined =
    ormlTokenBalance ||
    palletAssetBalance ||
    evmNativeBalance ||
    polkadotNativeChainBalance ||
    ethersContractBalance

  return balance
}
