import Decimal from 'decimal.js'
import useSWRSubscription from 'swr/subscription'
import useAssetsMetadata from './useAssetsMetadata'
import usePolkadotApi from './usePolkadotApi'

const useAssetBalance = (
  account?: string,
  assetId?: number
): Decimal | undefined => {
  const api = usePolkadotApi()
  const assetsMetadata = useAssetsMetadata()
  const {data} = useSWRSubscription(
    account != null &&
      api != null &&
      assetsMetadata != null && ['assetBalance', account, assetId, api],
    (_, {next}) => {
      let unsubscribe = (): void => {}
      if (api == null || account == null) {
        return unsubscribe
      }
      if (assetId == null) {
        void api.derive.balances
          .all(account, ({freeBalance}) => {
            next(null, new Decimal(freeBalance.toString()).div(1e12))
          })
          .then((fn) => {
            unsubscribe = fn
          })
      } else {
        const assetMetadata = assetsMetadata?.[assetId]
        if (assetMetadata == null) return unsubscribe

        void api.query.assets
          .account(assetId, account, (res) => {
            const unwrapped = res.unwrapOr({balance: 0})
            next(
              null,
              new Decimal(unwrapped.balance.toString()).div(
                Decimal.pow(10, assetMetadata.decimals)
              )
            )
          })
          .then((fn) => {
            unsubscribe = fn
          })
      }

      return unsubscribe
    }
  )

  return data
}

export default useAssetBalance
