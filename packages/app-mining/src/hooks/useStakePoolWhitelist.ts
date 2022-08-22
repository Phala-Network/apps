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
      const json = res.toJSON() as string[] | null
      // NOTE: when the pool is not in the whitelist, the result is null instead of []
      if (json === null) return []
      return json
    },
    {
      refetchInterval: 12000,
      enabled,
    }
  )

  return result
}
