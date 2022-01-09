import {useApiPromise} from '@phala/react-libs'
import Decimal from 'decimal.js'
import {useCallback, useEffect, useState} from 'react'

export function useKhalaBridgeFee() {
  const {api} = useApiPromise()
  const [fee, setFee] = useState<Decimal | undefined>()

  const getFeeData = useCallback(
    async function () {
      const result = await api?.query?.bridgeTransfer?.bridgeFee?.(0)

      // NOTE: for debug
      // console.log('result2', result?.toJSON())
      // console.log('result', result?.toHuman())

      const resultJSON = result?.toJSON?.() as [number]

      if (!resultJSON) {
        return
      }

      const fee = new Decimal(resultJSON?.[0]?.toString()).div(10 ** 12)

      setFee(fee)

      return result
    },
    [api]
  )

  useEffect(() => {
    getFeeData()
  }, [getFeeData])

  return fee
}
