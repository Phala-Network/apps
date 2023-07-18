import {CHAINS, type PolkadotChainId} from '@/config/chain'
import {type ApiPromise} from '@polkadot/api'

export const createPolkadotApi = async (
  chainId: PolkadotChainId,
): Promise<ApiPromise> => {
  const endpoint = CHAINS[chainId].endpoint
  const {ApiPromise, WsProvider} = await import('@polkadot/api')
  const wsProvider = new WsProvider(endpoint)
  const api = await ApiPromise.create({provider: wsProvider})

  return api
}
