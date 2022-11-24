import {VoidFn} from '@polkadot/api/types'
import {hexToString} from '@polkadot/util'
import Decimal from 'decimal.js'
import {useEffect, useState} from 'react'
import useSWRImmutable from 'swr/immutable'
import usePolkadotApi from './usePolkadotApi'

const useAsset = (account?: string, assetId?: number | string) => {
  const api = usePolkadotApi()
  const {data: assetMetadata} = useSWRImmutable(
    api && assetId !== undefined ? [api, assetId] : null,
    async (api, assetId) => {
      const metadata = await api.query.assets.metadata(assetId)
      return metadata
    }
  )
  const [balance, setBalance] = useState<Decimal>()

  useEffect(() => {
    setBalance(undefined)
    if (!api || !account) {
      return
    }
    let unsub: VoidFn
    let unmounted = false
    if (assetId === undefined) {
      api.derive.balances
        .account(account, ({freeBalance}) => {
          if (!unmounted) {
            setBalance(new Decimal(freeBalance.toString()).div(1e12))
          }
        })
        .then((fn) => {
          unsub = fn
        })
    } else {
      if (assetMetadata?.decimals === undefined) return
      api.query.assets
        .account(assetId, account, (res) => {
          const unwrapped = res.unwrapOr({balance: 0})
          if (!unmounted) {
            setBalance(
              new Decimal(unwrapped.balance.toString()).div(
                Decimal.pow(10, assetMetadata.decimals.toString())
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
