import {u128} from '@polkadot/types'
import Decimal from 'decimal.js'
import useSWRImmutable from 'swr/immutable'
import usePolkadotApi from './usePolkadotApi'

export type TokenomicParameters = {
  phaRate: Decimal
  budgetPerBlock: Decimal
  vMax: Decimal
  treasuryRatio: Decimal
  re: Decimal
  k: Decimal
}

export const fromBits = (value: u128): Decimal =>
  new Decimal(value.toString()).div(new Decimal(2).pow(64))

const useTokenomicParameters = (): TokenomicParameters | undefined => {
  const api = usePolkadotApi()
  const {data} = useSWRImmutable(api ? [api] : null, async (api) => {
    const tokenomicParameters =
      await api.query.phalaComputation.tokenomicParameters()
    const t = tokenomicParameters.unwrap()
    return {
      phaRate: fromBits(t.phaRate),
      budgetPerBlock: fromBits(t.budgetPerBlock),
      vMax: fromBits(t.vMax),
      treasuryRatio: fromBits(t.treasuryRatio),
      re: fromBits(t.re),
      k: fromBits(t.k),
    }
  })
  return data
}

export default useTokenomicParameters
