import {ethersContractBalanceFetcher} from '@/lib/ethersFetcher'
import {
  assetPalletBalanceFetcher,
  polkadotAvailableBalanceFetcher,
} from '@/lib/polkadotFetcher'
import {
  assetAtom,
  bridgeInfoAtom,
  fromChainAtom,
  toChainAtom,
} from '@/store/bridge'
import Decimal from 'decimal.js'
import {useAtomValue} from 'jotai'
import useSWR from 'swr'
import {useEthersAssetContract} from './useEthersContract'
import {useEthersJsonRpcProvider} from './useEthersProvider'
import {usePolkadotApi} from './usePolkadotApi'

const refreshInterval = 12000

export const useBridgeLimit = (): Decimal | undefined => {
  const fromChain = useAtomValue(fromChainAtom)
  const toChain = useAtomValue(toChainAtom)
  const asset = useAtomValue(assetAtom)
  const bridge = useAtomValue(bridgeInfoAtom)
  const ethereumJsonRpcProvider = useEthersJsonRpcProvider(
    'https://rpc.ankr.com/eth',
  )
  const moonriverJsonRpcProvider = useEthersJsonRpcProvider(
    'https://rpc.api.moonriver.moonbeam.network',
  )
  const moonriverZlkContract = useEthersAssetContract(
    moonriverJsonRpcProvider,
    'moonriver',
    'zlk',
  )
  const ethereumPhaContract = useEthersAssetContract(
    ethereumJsonRpcProvider,
    'ethereum',
    'pha',
  )
  const phalaApi = usePolkadotApi('phala')
  const khalaApi = usePolkadotApi('khala')

  const hasLimit =
    ((fromChain.id === 'moonriver' || toChain.id === 'moonriver') &&
      asset.id === 'zlk') ||
    bridge.kind === 'evmSygma' ||
    bridge.kind === 'phalaSygma' ||
    (toChain.id === 'ethereum' &&
      (bridge.proxy === 'phala' || bridge.proxy === 'khala'))

  const {data: moonriverReservedZlk} = useSWR(
    toChain.id === 'moonriver' &&
      asset.id === 'zlk' &&
      moonriverZlkContract != null && [
        moonriverZlkContract,
        asset.reservedAddress?.moonriver,
        asset.decimals.moonriver ?? asset.decimals.default,
      ],
    ethersContractBalanceFetcher,
    {refreshInterval},
  )

  const {data: khalaReservedZlk} = useSWR(
    khalaApi != null &&
      fromChain.id === 'moonriver' &&
      asset.id === 'zlk' && [
        khalaApi,
        asset.reservedAddress?.khala,
        asset.palletAssetId?.khala,
        asset.decimals.khala ?? asset.decimals.default,
      ],
    assetPalletBalanceFetcher,
    {refreshInterval},
  )

  const {data: ethereumReservedPha} = useSWR(
    ethereumPhaContract != null &&
      (bridge.kind === 'phalaSygma' ||
        bridge.proxy === 'phala' ||
        bridge.proxy === 'khala') &&
      toChain.id === 'ethereum' &&
      asset.id === 'pha' && [
        ethereumPhaContract,
        asset.reservedAddress?.ethereum,
        asset.decimals.ethereum ?? asset.decimals.default,
      ],
    ethersContractBalanceFetcher,
    {refreshInterval},
  )

  const {data: phalaReservedPha} = useSWR(
    phalaApi != null &&
      (toChain.id === 'phala' || bridge.proxy === 'phala') &&
      asset.id === 'pha' &&
      fromChain.id === 'ethereum' && [phalaApi, asset.reservedAddress?.phala],
    polkadotAvailableBalanceFetcher,
    {refreshInterval},
  )

  const {data: khalaReservedPha} = useSWR(
    khalaApi != null &&
      toChain.id === 'khala' &&
      asset.id === 'pha' &&
      fromChain.id === 'ethereum' && [khalaApi, asset.reservedAddress?.khala],
    polkadotAvailableBalanceFetcher,
    {refreshInterval},
  )

  return hasLimit
    ? moonriverReservedZlk ??
        khalaReservedZlk ??
        phalaReservedPha ??
        khalaReservedPha ??
        ethereumReservedPha
    : new Decimal(Infinity)
}
