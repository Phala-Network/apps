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
import {useCurrentEthersAssetContract} from './useEthersContract'
import {useEthersWeb3Provider} from './useEthersProvider'
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
  const ethersWeb3Provider = useEthersWeb3Provider()
  const polkadotApi = useCurrentPolkadotApi()
  const ethersAssetContract = useCurrentEthersAssetContract()

  let balanceSource: BalanceSource = null

  if (
    (fromChain.id === 'karura' ||
      fromChain.id === 'karura-test' ||
      fromChain.id === 'bifrost' ||
      fromChain.id === 'bifrost-test' ||
      fromChain.id === 'turing') &&
    asset.id !== fromChain.nativeAsset &&
    asset.ormlToken !== undefined
  ) {
    balanceSource = 'ormlToken'
  } else if (
    (fromChain.id === 'phala' ||
      fromChain.id === 'khala' ||
      fromChain.id === 'thala' ||
      fromChain.id === 'parallel-heiko' ||
      fromChain.id === 'calamari') &&
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
    balanceSource === 'ormlToken' &&
      polkadotApi &&
      polkadotAccount &&
      asset.ormlToken
      ? [
          polkadotApi,
          polkadotAccount.address,
          fromChain.id === 'karura' ||
          fromChain.id === 'karura-test' ||
          fromChain.id === 'bifrost' ||
          fromChain.id === 'bifrost-test'
            ? {Token: asset.ormlToken}
            : asset.ormlToken,
          decimals,
        ]
      : null,
    ormlTokenBalanceFetcher,
    {refreshInterval}
  )
  const {data: palletAssetBalance} = useSWR(
    balanceSource === 'palletAsset' &&
      polkadotApi &&
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
    balanceSource === 'polkadotNative' && polkadotApi && polkadotAccount
      ? [polkadotApi, polkadotAccount.address]
      : null,
    polkadotAvailableBalanceFetcher,
    {refreshInterval}
  )
  const {data: evmNativeBalance} = useSWR(
    balanceSource === 'evmBalance' &&
      ethersWeb3Provider &&
      evmAccount &&
      ethersWeb3Provider
      ? [ethersWeb3Provider, evmAccount]
      : null,
    ethersBalanceFetcher,
    {refreshInterval}
  )
  const {data: ethersContractBalance} = useSWR(
    balanceSource === 'evmContract' &&
      ethersAssetContract &&
      evmAccount &&
      ethersAssetContract
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
