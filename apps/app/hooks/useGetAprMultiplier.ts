import {apyToApr} from '@/lib/apr'
import {useGlobalStateQuery} from '@/lib/subsquidQuery'
import {subsquidClientAtom} from '@/store/common'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {useCallback} from 'react'

const ONE_YEAR = 365 * 24 * 60 * 60 * 1000

const useGetAprMultiplier = (): ((
  aprOrApy: string | Decimal,
  isApy?: boolean,
) => Decimal | undefined) => {
  const [subsquidClient] = useAtom(subsquidClientAtom)
  const {data: globalState} = useGlobalStateQuery(subsquidClient, undefined, {
    select: (data) => data.globalStateById,
  })

  const {averageBlockTime, idleWorkerShares, budgetPerBlock, treasuryRatio} =
    globalState ?? {}

  return useCallback(
    (aprOrApy: string | Decimal, isApy = false) => {
      if (
        averageBlockTime === undefined ||
        idleWorkerShares === undefined ||
        budgetPerBlock === undefined ||
        treasuryRatio === undefined
      ) {
        return
      }
      try {
        const apr = isApy
          ? apyToApr(new Decimal(aprOrApy).div(100))
          : new Decimal(aprOrApy).div(100)
        return apr.div(
          new Decimal(budgetPerBlock)
            .times(new Decimal(1).minus(treasuryRatio))
            .times(ONE_YEAR)
            .div(averageBlockTime)
            .div(idleWorkerShares),
        )
      } catch (err) {
        // noop
      }
    },
    [averageBlockTime, budgetPerBlock, idleWorkerShares, treasuryRatio],
  )
}

export default useGetAprMultiplier
