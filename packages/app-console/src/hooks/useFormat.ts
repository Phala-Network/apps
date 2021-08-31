import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import {toFixed} from '@phala/utils'
import Decimal from 'decimal.js'
import {useCallback} from 'react'

type Format = (value: Decimal | number | undefined | null) => string

const useFormat = (): Format => {
  const {api} = useApiPromise()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)

  return useCallback<Format>(
    (value) => {
      if (decimals && (value || value === 0)) {
        return `${toFixed(new Decimal(value).div(decimals))} PHA`
      }
      return '-'
    },
    [decimals]
  )
}

export default useFormat
