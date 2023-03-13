import Decimal from 'decimal.js'
import useSWRSubscription from 'swr/subscription'
import usePolkadotApi from './usePolkadotApi'

const useLockedWrappedBalance = (account?: string): Decimal | undefined => {
  const api = usePolkadotApi()
  const {data} = useSWRSubscription(
    api != null && account != null && ['lockedWrappedBalance', account, api],
    (_, {next}) => {
      let unsubscribe = (): void => {}
      if (api == null || account == null) {
        return unsubscribe
      }
      void api.query.phalaWrappedBalances
        .stakerAccounts(account, (res) => {
          const unwrapped = res.unwrapOr({locked: 0})
          next(null, new Decimal(unwrapped.locked.toString()).div(1e12))
        })
        .then((fn) => {
          unsubscribe = fn
        })

      return unsubscribe
    }
  )

  return data
}

export default useLockedWrappedBalance
