import {type ApiPromise} from '@polkadot/api'

const createPolkadotApi = async ([endpoint]: [
  string | string[]
]): Promise<ApiPromise> => {
  const {ApiPromise, WsProvider} = await import('@polkadot/api')
  const wsProvider = new WsProvider(endpoint)
  const api = await ApiPromise.create({provider: wsProvider})

  return api
}

export default createPolkadotApi
