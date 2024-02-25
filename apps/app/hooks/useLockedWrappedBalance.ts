import {useQuery} from '@tanstack/react-query'
import Decimal from 'decimal.js'
import usePolkadotApi from './usePolkadotApi'

const useLockedWrappedBalance = (
  account?: string,
): Decimal | undefined | null => {
  const api = usePolkadotApi()
  const {data} = useQuery({
    queryKey: ['lockedWrappedBalance', api?.runtimeChain, account],
    queryFn: async () => {
      if (api == null || account == null) {
        return null
      }
      const res = await api.query.phalaWrappedBalances.stakerAccounts(account)
      const unwrapped = res.unwrapOr({locked: 0})
      return new Decimal(unwrapped.locked.toString()).div(1e12)
    },
  })

  return data
}

export default useLockedWrappedBalance
