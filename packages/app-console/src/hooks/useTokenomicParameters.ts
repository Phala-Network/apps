import Decimal from 'decimal.js'
import {useQuery} from 'react-query'
import {useApiPromise} from '@phala/react-libs/esm/polkadot/hooks/useApiPromise'

type TokenomicParameters = {
  phaRate: Decimal
  rho: Decimal
  budgetPerBlock: Decimal
  vMax: Decimal
  costK: Decimal
  costB: Decimal
  slashRate: Decimal
  treasuryRatio: Decimal
  heartbeatWindow: Decimal
  rigK: Decimal
  rigB: Decimal
  re: Decimal
  k: Decimal
  kappa: Decimal
}

const useTokenomicParameters = () => {
  const {api, initialized} = useApiPromise()
  return useQuery(['tokenomicParameters', initialized], () =>
    api?.query.phalaMining
      ?.tokenomicParameters?.()
      .then(
        (res) =>
          res.toJSON() as Record<keyof TokenomicParameters, string | number>
      )
      .then(
        (json) =>
          Object.fromEntries(
            Object.entries(json).map(([k, v]) => [
              k,
              new Decimal(v).div(new Decimal(2).pow(64)),
            ])
          ) as TokenomicParameters
      )
  )
}

export default useTokenomicParameters
