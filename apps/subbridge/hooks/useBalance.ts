import {
  ethersBalanceFetcher,
  ethersContractBalanceFetcher,
} from '@/lib/ethersFetcher'
import {
  polkadotBalanceFetcher,
  polkadotNativeBalanceFetcher,
} from '@/lib/polkadotFetcher'
import {assetAtom, decimalsAtom, fromChainAtom} from '@/store/bridge'
import {evmAccountAtom} from '@/store/ethers'
import {polkadotAccountAtom} from '@phala/store'
import type Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import useSWR from 'swr'
import {useCurrentEthersAssetContract} from './useEthersContract'
import {useEthersWeb3Provider} from './useEthersProvider'
import {useCurrentPolkadotApi} from './usePolkadotApi'

const refreshInterval = 12000

type BalanceSource =
  | 'tokensPallet'
  | 'assetsPallet'
  | 'polkadotNative'
  | 'evmNative'
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

  if (fromChain.kind === 'substrate' && fromChain.nativeAsset === asset.id) {
    balanceSource = 'polkadotNative'
  } else if (fromChain.kind === 'evm') {
    if (fromChain.nativeAsset === asset.id) {
      balanceSource = 'evmNative'
    } else {
      balanceSource = 'evmContract'
    }
  } else {
    balanceSource = fromChain.balanceSource
  }

  const {data: polkadotBalance} = useSWR(
    (balanceSource === 'assetsPallet' || balanceSource === 'tokensPallet') &&
      polkadotApi != null &&
      polkadotAccount != null &&
      fromChain.kind === 'substrate' &&
      asset.polkadotAssetId?.[fromChain.id] != null && [
        polkadotApi,
        polkadotAccount.address,
        asset.polkadotAssetId[fromChain.id],
        decimals,
        balanceSource,
      ],
    polkadotBalanceFetcher,
    {refreshInterval},
  )
  const {data: polkadotNativeBalance} = useSWR(
    balanceSource === 'polkadotNative' &&
      polkadotApi != null &&
      polkadotAccount != null && [polkadotApi, polkadotAccount.address],
    polkadotNativeBalanceFetcher,
    {refreshInterval},
  )
  const {data: evmNativeBalance} = useSWR(
    balanceSource === 'evmNative' &&
      ethersWeb3Provider != null &&
      evmAccount != null && [ethersWeb3Provider, evmAccount],
    ethersBalanceFetcher,
    {refreshInterval},
  )
  const {data: ethersContractBalance} = useSWR(
    balanceSource === 'evmContract' &&
      ethersAssetContract != null &&
      evmAccount != null && [ethersAssetContract, evmAccount, decimals],
    ethersContractBalanceFetcher,
    {refreshInterval},
  )

  const balance: Decimal | undefined =
    polkadotBalance ??
    polkadotNativeBalance ??
    evmNativeBalance ??
    ethersContractBalance

  return balance
}
