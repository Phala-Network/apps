import {CHAINS, PolkadotChainId} from '@/config/chain'
import type {ApiOptions} from '@polkadot/api/types'

export const createPolkadotApi = async (
  chainId: PolkadotChainId,
  options?: ApiOptions
) => {
  const endpoint = CHAINS[chainId].endpoint
  const {ApiPromise, WsProvider} = await import('@polkadot/api')
  const wsProvider = new WsProvider(endpoint)
  const api = await ApiPromise.create({provider: wsProvider, ...options})

  return api
}
