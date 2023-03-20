import {useQuery} from '@tanstack/react-query'
import Decimal from 'decimal.js'
import useAssetsMetadata from './useAssetsMetadata'
import usePolkadotApi from './usePolkadotApi'

const useAssetBalance = (
  account?: string,
  assetId?: number
): Decimal | null | undefined => {
  const api = usePolkadotApi()
  const assetsMetadata = useAssetsMetadata()
  const {data} = useQuery(
    [
      'assetBalance',
      api?.runtimeChain,
      assetsMetadata == null,
      account,
      assetId,
    ],
    async () => {
      if (api == null || account == null) {
        return null
      }
      if (assetId == null) {
        const {freeBalance} = await api.derive.balances.all(account)
        return new Decimal(freeBalance.toHex()).div(1e12)
      } else {
        const assetMetadata = assetsMetadata?.[assetId]
        if (assetMetadata == null) return null
        const res = await api.query.assets.account(assetId, account)
        const unwrapped = res.unwrapOr({balance: 0})
        return new Decimal(unwrapped.balance.toString()).div(
          Decimal.pow(10, assetMetadata.decimals)
        )
      }
    }
  )

  return data
}

export default useAssetBalance
