import {ApiPromise, HttpProvider, WsProvider} from '@polkadot/api'

export const createPolkadotApi = async (
  endpoint: string,
): Promise<ApiPromise> => {
  const provider = endpoint.startsWith('ws')
    ? new WsProvider(endpoint)
    : new HttpProvider(endpoint)
  const api = await ApiPromise.create({provider})

  return api
}
