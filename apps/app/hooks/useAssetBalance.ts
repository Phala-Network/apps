import {VoidFn} from '@polkadot/api/types'
import Decimal from 'decimal.js'
import {useEffect, useState} from 'react'
import useAssetsMetadata from './useAssetsMetadata'
import usePolkadotApi from './usePolkadotApi'

const useAssetBalance = (account?: string, assetId?: number) => {
  const api = usePolkadotApi()
  const assetsMetadata = useAssetsMetadata()
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
      const assetMetadata = assetsMetadata?.[assetId]
      if (!assetMetadata) return
      api.query.assets
        .account(assetId, account, (res) => {
          const unwrapped = res.unwrapOr({balance: 0})
          if (!unmounted) {
            setBalance(
              new Decimal(unwrapped.balance.toString()).div(
                Decimal.pow(
                  10,
                  // TODO: remove hardcode
                  assetId === 1 ? 12 : assetMetadata.decimals
                )
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
  }, [api, assetId, account, assetsMetadata])

  return balance
}

export default useAssetBalance
