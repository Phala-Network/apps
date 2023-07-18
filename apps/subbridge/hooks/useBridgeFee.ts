import {getEvmSygmaTransfer} from '@/lib/evmSygma'
import {
  assetAtom,
  bridgeInfoAtom,
  fromChainAtom,
  toChainAtom,
} from '@/store/bridge'
import {evmAccountAtom} from '@/store/ethers'
import Decimal from 'decimal.js'
import {useAtomValue} from 'jotai'
import useSWR from 'swr'
import {useEthersWeb3Provider} from './useEthersProvider'
import {useCurrentPolkadotApi} from './usePolkadotApi'

const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
const zlkChainBridgeFee = new Decimal('0.25')

export const useBridgeFee = (): Decimal | undefined => {
  const fromChain = useAtomValue(fromChainAtom)
  const toChain = useAtomValue(toChainAtom)
  const asset = useAtomValue(assetAtom)
  const bridge = useAtomValue(bridgeInfoAtom)
  const api = useCurrentPolkadotApi()
  const provider = useEthersWeb3Provider()
  const evmAccount = useAtomValue(evmAccountAtom)
  const isTransferringZlkThroughChainBridge =
    fromChain.kind === 'polkadot' &&
    toChain.kind === 'evm' &&
    asset.id === 'zlk'

  const {data: evmSygmaFee} = useSWR(
    bridge.kind === 'evmSygma' &&
      provider != null &&
      evmAccount !== null && [
        provider,
        evmAccount,
        fromChain,
        toChain,
        asset,
        'sygmaFee',
      ],
    async ([provider, evmAccount, fromChain, toChain, asset]) => {
      const {fee} = await getEvmSygmaTransfer(
        provider,
        fromChain,
        toChain,
        evmAccount,
        asset,
        ALICE,
        '1000000000000000000',
      )
      if (fee.feeData == null) {
        return
      }
      return new Decimal(fee.feeData).div(Decimal.pow(10, 18))
    },
  )

  const {data: phalaSygmaFee} = useSWR(
    bridge.kind === 'phalaSygma' && api != null && [api, 'substrateSygmaFee'],
    async ([api]) => {
      const fee = await api.query.sygmaBasicFeeHandler.assetFees([
        1,
        {concrete: {parents: 0, interior: 'Here'}},
      ])
      return new Decimal(fee.toString()).div(Decimal.pow(10, 12))
    },
  )

  if (bridge.kind === 'phalaSygma') {
    return phalaSygmaFee
  }

  if (bridge.kind === 'evmSygma') {
    return evmSygmaFee
  }

  if (isTransferringZlkThroughChainBridge) {
    return zlkChainBridgeFee
  }

  return new Decimal(0)
}
