import {useApiPromise} from '@phala/react-libs'
import type {AccountId} from '@polkadot/types/interfaces'
import {useEffect, useState} from 'react'
import {Decimal} from 'decimal.js'

type TokenType = 'BNC' | 'ZLK'

const ASSET_ID_MAP = {
  BNC: 2,
  ZLK: 1,
}

export default function useAssetBalance(
  token: TokenType,
  address?: string | AccountId | Uint8Array
): Decimal | undefined {
  const {api, readystate} = useApiPromise()
  const [assetBalance, setAssetBalance] = useState<Decimal>()
  const initialized = readystate === 'ready'
  useEffect(() => {
    if (!address || !initialized || !api || !(token in ASSET_ID_MAP)) {
      return
    }

    let unsubscribe: () => void

    api.query.assets
      .account(ASSET_ID_MAP[token], address, ({balance}) => {
        setAssetBalance(new Decimal(balance.toString()))
      })
      .then((_unsubscribe) => (unsubscribe = _unsubscribe))

    return () => {
      unsubscribe?.()
    }
  }, [api, initialized, token, address])

  return assetBalance
}
