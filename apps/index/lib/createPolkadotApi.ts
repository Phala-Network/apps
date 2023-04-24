import {type ApiPromise} from '@polkadot/api'

export const createPolkadotApi = async (
  endpoint: string,
): Promise<ApiPromise> => {
  const {ApiPromise, WsProvider} = await import('@polkadot/api')
  const provider = new WsProvider(endpoint)
  const api = await ApiPromise.create({provider})

  return api
}
