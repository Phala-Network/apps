import {useApiPromise} from '@phala/react-libs'
import {useQuery, UseQueryResult} from 'react-query'

export default function useGracePeriod(): UseQueryResult<
  number | null,
  unknown
> {
  const {api, initialized} = useApiPromise()
  return useQuery<number | null>(
    ['gracePeriod', initialized],
    () => (api?.consts.phalaStakePool?.gracePeriod?.toJSON() as number) ?? null,
    {refetchOnMount: false}
  )
}
