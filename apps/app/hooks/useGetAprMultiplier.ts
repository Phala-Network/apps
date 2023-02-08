import {apyToApr} from '@/lib/apr'
import {subsquidClient} from '@/lib/graphql'
import {useGlobalStateQuery} from '@/lib/subsquidQuery'
import Decimal from 'decimal.js'
import {useCallback} from 'react'
import useTokenomicParameters from './useTokenomicParameters'

const ONE_YEAR = 365 * 24 * 60 * 60 * 1000

const useGetAprMultiplier = (): ((
  aprOrApy: string | Decimal,
  isApy?: boolean
) => Decimal | undefined) => {
  const {data: globalStateData} = useGlobalStateQuery(subsquidClient, {})
  const tokenomicParameters = useTokenomicParameters()

  const {averageBlockTime, idleWorkerShares} =
    globalStateData?.globalStateById ?? {}

  return useCallback(
    (aprOrApy: string | Decimal, isApy = false) => {
      if (
        averageBlockTime === undefined ||
        idleWorkerShares === undefined ||
        tokenomicParameters === undefined
      ) {
        return
      }
      const {budgetPerBlock, treasuryRatio} = tokenomicParameters
      try {
        const apr = isApy
          ? apyToApr(new Decimal(aprOrApy).div(100))
          : new Decimal(aprOrApy).div(100)
        return apr.div(
          budgetPerBlock
            .times(treasuryRatio.negated().add(1))
            .times(ONE_YEAR)
            .div(averageBlockTime)
            .div(idleWorkerShares)
        )
      } catch (err) {
        // noop
      }
    },
    [averageBlockTime, tokenomicParameters, idleWorkerShares]
  )
}

export default useGetAprMultiplier
