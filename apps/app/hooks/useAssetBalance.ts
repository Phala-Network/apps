import {useQuery} from '@tanstack/react-query'
import Decimal from 'decimal.js'
import useAssetsMetadata from './useAssetsMetadata'
import usePolkadotApi from './usePolkadotApi'

const useAssetBalance = (
  account: string | undefined,
  assetId: number | 'free' | 'available',
): Decimal | null | undefined => {
  const api = usePolkadotApi()
  const assetsMetadata = useAssetsMetadata()
  const {data} = useQuery({
    queryKey: ['assetBalance', api?.runtimeChain, account, assetId],
    enabled: api != null && account != null && assetsMetadata != null,
    queryFn: async () => {
      if (api == null || account == null) {
        return null
      }
      if (typeof assetId === 'number') {
        const assetMetadata = assetsMetadata?.[assetId]
        if (assetMetadata == null) return null
        const res = await api.query.assets.account(assetId, account)
        const unwrapped = res.unwrapOr({balance: 0})
        return new Decimal(unwrapped.balance.toString()).div(
          Decimal.pow(10, assetMetadata.decimals),
        )
      }
      const {availableBalance, freeBalance} =
        await api.derive.balances.all(account)
      return new Decimal(
        (assetId === 'available' ? availableBalance : freeBalance).toHex(),
      ).div(1e12)
    },
  })

  return data
}

export default useAssetBalance
