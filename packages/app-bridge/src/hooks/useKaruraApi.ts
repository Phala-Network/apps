import {useCurrentAccount} from '@phala/app-store'
import {ApiPromise, WsProvider} from '@polkadot/api'
import Decimal from 'decimal.js'
import {atom, useAtomValue} from 'jotai'
import {useQuery} from 'react-query'

const karuraApiAtom = atom<ApiPromise | null>(null)

karuraApiAtom.onMount = (setAtom) => {
  let karuraApi: ApiPromise
  ApiPromise.create({
    provider: new WsProvider('wss://karura-rpc-1.aca-api.network'),
  }).then((api) => {
    karuraApi = api
    setAtom(api)
  })

  return () => {
    if (karuraApi) {
      karuraApi.disconnect()
    }
  }
}

export const useKaruraApi = () => useAtomValue(karuraApiAtom)

export const useKaruraPHABalance = () => {
  const [polkadotAccount] = useCurrentAccount()
  const karuraApi = useKaruraApi()

  const {data} = useQuery(
    ['karuraPHABalance', Boolean(karuraApi), polkadotAccount?.address],
    () => {
      if (!karuraApi || !polkadotAccount?.address) return
      return karuraApi.query.tokens
        ?.accounts?.(polkadotAccount.address, {Token: 'PHA'})
        .then((data) =>
          new Decimal((data.toJSON() as {free: number}).free).div(10 ** 12)
        )
    },
    {
      enabled: Boolean(karuraApi) && Boolean(polkadotAccount?.address),
      refetchInterval: 3000,
    }
  )

  return data || new Decimal(0)
}
