import {VoidFn} from '@polkadot/api/types'
import {hexToString} from '@polkadot/util'
import Decimal from 'decimal.js'
import {useEffect, useState} from 'react'
import useSWRImmutable from 'swr/immutable'
import usePolkadotApi from './usePolkadotApi'

const useAsset = (account?: string, assetId?: number | string) => {
  const api = usePolkadotApi()
  const {data: assetMetadata} = useSWRImmutable(
    !api || assetId === undefined ? null : [api, assetId],
    async (api, assetId) => {
      const metadata = await api.query.assets.metadata(assetId)
      return metadata
    }
  )
  const [balance, setBalance] = useState<Decimal>()

  useEffect(() => {
    setBalance(undefined)
    if (!api || !account || assetMetadata?.decimals === undefined) {
      return
    }
    let unsub: VoidFn
    let unmounted = false
    if (assetId === undefined) {
      // TODO: fetch native token balance
    } else {
      api.query.assets
        .account(assetId, account, (res) => {
          const unwrapped = res.unwrapOr({balance: 0})
          if (!unmounted) {
            setBalance(
              new Decimal(unwrapped.balance.toString()).div(
                new Decimal(10).pow(assetMetadata.decimals.toString())
              )
            )
          }
        })
        .then((fn) => {
          unsub = fn
        })
    }
    return () => {
      unmounted = true
      unsub?.()
    }
  }, [api, assetId, account, assetMetadata?.decimals])

  return {
    symbol: assetMetadata && hexToString(assetMetadata.symbol.toHex()),
    balance,
  }
}

export default useAsset
