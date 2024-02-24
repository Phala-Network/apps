import getDelegationProfit from '@/lib/getDelegationProfit'
import {useDelegationSnapshotsConnectionQuery} from '@/lib/subsquidQuery'
import {subsquidClientAtom} from '@/store/common'
import {addDays} from 'date-fns'
import {useAtom} from 'jotai'
import {useMemo} from 'react'
import useToday from './useToday'

const useDelegationOneDayProfit = (id: string) => {
  const today = useToday()
  const pastTwoDays = useMemo(() => {
    const date = new Date(today)
    return [date.toISOString(), addDays(date, -1).toISOString()]
  }, [today])
  const [subsquidClient] = useAtom(subsquidClientAtom)
  const {data} = useDelegationSnapshotsConnectionQuery(
    subsquidClient,
    {
      orderBy: 'updatedTime_ASC',
      where: {delegation_eq: id, updatedTime_in: pastTwoDays},
    },
    {select: (data) => data.delegationSnapshotsConnection.edges},
  )
  if (data?.length !== 2) return null
  return getDelegationProfit(data[1].node, data[0].node)
}

export default useDelegationOneDayProfit
