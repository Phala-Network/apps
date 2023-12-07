import {
  ethersBalanceFetcher,
  ethersContractBalanceFetcher,
} from '@/lib/ethersFetcher'
import {polkadotNativeBalanceFetcher} from '@/lib/polkadotFetcher'
import {fromAssetAtom, fromChainAtom} from '@/store/core'
import {evmAccountAtom} from '@/store/ethers'
import {polkadotAccountAtom} from '@phala/store'
import type Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import useSWR from 'swr'
import {useCurrentEthersAssetContract} from './useEthersContract'
import {useEthersBrowserProvider} from './useEthersProvider'
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
  const [fromAsset] = useAtom(fromAssetAtom)
  const [polkadotAccount] = useAtom(polkadotAccountAtom)
  const [evmAccount] = useAtom(evmAccountAtom)
  const ethersBrowserProvider = useEthersBrowserProvider()
  const polkadotApi = useCurrentPolkadotApi()
  const ethersAssetContract = useCurrentEthersAssetContract()

  let balanceSource: BalanceSource = null
  if (fromChain != null && fromAsset != null) {
    const isNative = fromChain.nativeAsset === fromAsset.location
    if (fromChain.chainType === 'Sub') {
      if (isNative) {
        balanceSource = 'polkadotNative'
      }
      // else if (fromChain.name === 'Acala') {
      //   balanceSource = 'ormlToken'
      // }
    } else if (fromChain.chainType === 'Evm') {
      if (isNative) {
        balanceSource = 'evmNative'
      } else {
        balanceSource = 'evmContract'
      }
    }
  }

  // const {data: polkadotBalance} = useSWR(
  //   (balanceSource === 'assetsPallet' || balanceSource === 'tokensPallet') &&
  //     polkadotApi != null &&
  //     polkadotAccount != null &&
  //     fromChain.kind === 'substrate' &&
  //     asset.polkadotAssetId?.[fromChain.id] != null && [
  //       polkadotApi,
  //       polkadotAccount.address,
  //       asset.polkadotAssetId[fromChain.id],
  //       decimals,
  //       balanceSource,
  //     ],
  //   polkadotBalanceFetcher,
  //   {refreshInterval},
  // )
  const {data: polkadotNativeBalance} = useSWR(
    balanceSource === 'polkadotNative' &&
      polkadotApi != null &&
      polkadotAccount != null && [polkadotApi, polkadotAccount.address],
    polkadotNativeBalanceFetcher,
    {refreshInterval},
  )
  const {data: evmNativeBalance} = useSWR(
    balanceSource === 'evmNative' &&
      ethersBrowserProvider != null &&
      evmAccount != null && [ethersBrowserProvider, evmAccount],
    ethersBalanceFetcher,
    {refreshInterval},
  )
  const {data: ethersContractBalance} = useSWR(
    balanceSource === 'evmContract' &&
      ethersAssetContract != null &&
      evmAccount != null &&
      fromAsset != null && [
        ethersAssetContract,
        evmAccount,
        fromAsset.decimals,
      ],
    ethersContractBalanceFetcher,
    {refreshInterval},
  )

  const balance: Decimal | undefined =
    polkadotNativeBalance ?? evmNativeBalance ?? ethersContractBalance

  return balance
}
