import {khalaSubsquidClient, phalaSubsquidClient} from '@/config'
import {useGlobalStateQuery} from '@/lib/subsquidQuery'
import {type Chain, subsquidClientAtom} from '@/store/common'
import Decimal from 'decimal.js'
import {useAtom} from 'jotai'
import {useCallback} from 'react'

const ONE_YEAR = 365 * 24 * 60 * 60 * 1000

const useGetApr = (
  chain?: Chain,
): ((aprMultiplier: string | Decimal) => Decimal | undefined) => {
  const [subsquidClient] = useAtom(subsquidClientAtom)
  const {data: globalStateData} = useGlobalStateQuery(
    chain == null
      ? subsquidClient
      : chain === 'phala'
        ? phalaSubsquidClient
        : khalaSubsquidClient,
    undefined,
    {select: (data) => data.globalStateById},
  )

  const {averageBlockTime, idleWorkerShares, budgetPerBlock, treasuryRatio} =
    globalStateData ?? {}

  return useCallback(
    (aprMultiplier: string | Decimal) => {
      if (
        averageBlockTime === undefined ||
        idleWorkerShares === undefined ||
        budgetPerBlock === undefined ||
        treasuryRatio === undefined
      ) {
        return
      }
      return new Decimal(budgetPerBlock)
        .times(new Decimal(1).minus(treasuryRatio))
        .times(ONE_YEAR)
        .div(averageBlockTime)
        .div(idleWorkerShares)
        .times(aprMultiplier)
    },
    [averageBlockTime, idleWorkerShares, budgetPerBlock, treasuryRatio],
  )
}

export default useGetApr
