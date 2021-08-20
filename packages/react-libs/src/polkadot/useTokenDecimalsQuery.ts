import { ApiPromise } from '@polkadot/api'
import { Decimal } from 'decimal.js'
import { useMemo } from 'react'
import { useApiPromise } from '..'

function getTokenDecimals(api: ApiPromise): number | undefined {
  const tokenDecimals = api.registry.chainDecimals
  return tokenDecimals[0]
}

export const useTokenDecimals = (): number | undefined => {
  const { api } = useApiPromise()
  return useMemo(
    () => (api !== undefined ? getTokenDecimals(api) : undefined),
    [api]
  )
}

export interface UseDecimalMultiplierResult {
  decimals?: number
  multiplier?: Decimal
}

export const useDecimalMultiplier = (): UseDecimalMultiplierResult => {
  const decimals = useTokenDecimals()
  return useMemo(
    () => ({
      decimals,
      multiplier:
        decimals !== undefined ? new Decimal(10).pow(decimals) : undefined,
    }),
    [decimals]
  )
}
