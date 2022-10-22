import Decimal from 'decimal.js'
import {subsquidClient} from '../lib/graphqlClient'
import {useGlobalStateQuery, useTokenomicParametersQuery} from './subsquid'

const ONE_YEAR = 365 * 24 * 60 * 60 * 1000

const useAprCoefficient = (): Decimal | undefined => {
  const {data: globalStateData} = useGlobalStateQuery(
    subsquidClient,
    {},
    {refetchOnWindowFocus: false}
  )
  const {data: tokenomicParamatersData} = useTokenomicParametersQuery(
    subsquidClient,
    {},
    {refetchOnWindowFocus: false}
  )
  if (
    !globalStateData?.globalStateById ||
    !tokenomicParamatersData?.tokenomicParametersById
  ) {
    return
  }

  const {averageBlockTime, miningWorkerShare} = globalStateData.globalStateById
  const {budgetPerBlock, treasuryRatio} =
    tokenomicParamatersData.tokenomicParametersById

  return new Decimal(budgetPerBlock)
    .times(new Decimal(treasuryRatio).negated().add(1))
    .times(ONE_YEAR)
    .div(averageBlockTime)
    .div(miningWorkerShare)
}

export default useAprCoefficient
