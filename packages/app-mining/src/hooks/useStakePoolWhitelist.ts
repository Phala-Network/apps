import {useApiPromise} from '@phala/react-libs'
import {useQuery, UseQueryOptions} from 'react-query'

export const useStakePoolWhitelist = (
  pid?: string | number,
  options?: Pick<UseQueryOptions, 'enabled'>
) => {
  const {api} = useApiPromise()
  const {enabled = true} = options || {}
  const result = useQuery(
    ['stakePoolWhitelist', pid],
    async () => {
      if (!api || !pid) return
      const res = await api.query.phalaStakePool.poolContributionWhitelists(pid)
      return res.toJSON() as string[] | null
    },
    {
      refetchInterval: 12000,
      enabled,
    }
  )

  return result
}
