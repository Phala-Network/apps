import {ApiPromise} from '@polkadot/api'
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
  new Decimal(value.toString()).div(Decimal.pow(2, 64))

const tokenomicParametersFetcher = async (api: ApiPromise) => {
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
}

const useTokenomicParameters = (): TokenomicParameters | undefined => {
  const api = usePolkadotApi()
  const {data} = useSWRImmutable(
    api ? [api, 'tokenomicParameters'] : null,
    tokenomicParametersFetcher
  )
  return data
}

export default useTokenomicParameters
