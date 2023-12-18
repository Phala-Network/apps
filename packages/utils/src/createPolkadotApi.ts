import type {ApiPromise} from '@polkadot/api'
import type {ApiOptions} from '@polkadot/api/types'

export const createPolkadotApi = async (
  endpoint: string,
  options?: ApiOptions,
): Promise<ApiPromise> => {
  let metadata
  try {
    const url = `https://phala.network/api/rpc-metadata?rpc=${endpoint}`
    metadata = (await fetch(url).then(
      async (res) => await res.json(),
    )) as Record<string, `0x${string}`>
  } catch (err) {}
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
