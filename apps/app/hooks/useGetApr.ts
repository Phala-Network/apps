import {subsquidClient} from '@/lib/graphql'
import {useGlobalStateQuery} from '@/lib/subsquidQuery'
import Decimal from 'decimal.js'
import {useCallback} from 'react'
import useTokenomicParameters from './useTokenomicParameters'

const ONE_YEAR = 365 * 24 * 60 * 60 * 1000

const useGetApr = () => {
  const {data: globalStateData} = useGlobalStateQuery(subsquidClient, {})
  const tokenomicParameters = useTokenomicParameters()

  const {averageBlockTime, idleWorkerShares} =
    globalStateData?.globalStateById || {}

  return useCallback(
    (aprMultiplier: string | Decimal) => {
      if (!averageBlockTime || !idleWorkerShares || !tokenomicParameters) {
        return
      }
      const {budgetPerBlock, treasuryRatio} = tokenomicParameters
      return budgetPerBlock
        .times(treasuryRatio.negated().add(1))
        .times(ONE_YEAR)
        .div(averageBlockTime)
        .div(idleWorkerShares)
        .times(aprMultiplier)
    },
    [averageBlockTime, tokenomicParameters, idleWorkerShares]
  )
}

export default useGetApr
