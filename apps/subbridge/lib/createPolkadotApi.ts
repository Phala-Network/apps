import {CHAINS, type SubstrateChainId} from '@/config/chain'
import {type ApiPromise} from '@polkadot/api'

export const createPolkadotApi = async (
  chainId: SubstrateChainId,
): Promise<ApiPromise> => {
  const endpoint = CHAINS[chainId].endpoint
  const {ApiPromise, WsProvider} = await import('@polkadot/api')
  const wsProvider = new WsProvider(endpoint)
  const api = await ApiPromise.create({provider: wsProvider})

  return api
}
