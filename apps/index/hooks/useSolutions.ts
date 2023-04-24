import {
  fromAmountAtom,
  fromAssetAtom,
  fromChainAtom,
  toAssetAtom,
  toChainAtom,
} from '@/store/core'
import {useAtom} from 'jotai'
import useSWR, {type SWRResponse} from 'swr'

interface Solution {
  from: string
  to: string
  type?: 'transfer' | 'dex' | 'bridge'
  sourceChain?: string
  destChain?: string
  spendAsset?: string
  receiveAsset?: string
  receiveMin?: string
  tag?: string
}

const useSolutions = (): SWRResponse<{raw: Solution[]; compact: any}> => {
  const [fromChain] = useAtom(fromChainAtom)
  const [fromAsset] = useAtom(fromAssetAtom)
  const [fromAmount] = useAtom(fromAmountAtom)
  const [toChain] = useAtom(toChainAtom)
  const [toAsset] = useAtom(toAssetAtom)

  return useSWR(
    fromAmount.length > 0 && [
      'https://exprmt.site/solutions',
      fromChain.name,
      fromAsset.symbol,
      toChain.name,
      toAsset.symbol,
      fromAmount,
    ],
    // eslint-disable-next-line @typescript-eslint/naming-convention
    async ([url, src_chain, src_asset, dest_chain, dest_asset, amount]) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          src_chain,
          src_asset,
          dest_chain,
          dest_asset,
          amount,
        }),
      })

      if (!res.ok) {
        const error = new Error('Solutions Error')
        // error.info = await res.json()
        // error.status = res.status
        throw error
      }

      return await res.json()
    },
  )
}

export default useSolutions
