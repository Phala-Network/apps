import type {ApiPromise} from '@polkadot/api'
import type {ApiOptions} from '@polkadot/api/types'
import type {HexString} from '@polkadot/util/types'

export const createPolkadotApi = async (
  endpoint: string,
  options?: ApiOptions,
): Promise<ApiPromise> => {
  const metadata = await fetch(
    `https://phala.network/api/rpc-metadata?rpc=${endpoint}`,
  ).then(
    (res) => res.json() as unknown as Record<string, HexString>,
    () => {
      return undefined
    },
  )
  const {ApiPromise, WsProvider, HttpProvider} = await import('@polkadot/api')
  const provider = endpoint.startsWith('ws')
    ? new WsProvider(endpoint)
    : new HttpProvider(endpoint)
  const api = await ApiPromise.create({
    provider,
    metadata,
    noInitWarn: true,
    ...options,
  })

  return api
}
