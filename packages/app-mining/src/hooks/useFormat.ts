import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import {toFixed} from '@phala/utils'
import Decimal from 'decimal.js'
import {useCallback} from 'react'

type Format = (
  value: Decimal | number | undefined | null,
  option?: {unit: string | null}
) => string

const useFormat = (): Format => {
  const {api} = useApiPromise()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)

  return useCallback<Format>(
    (value, option) => {
      if (
        (value instanceof Decimal && value.isNaN()) ||
        (typeof value === 'number' && Number.isNaN(value))
      ) {
        return '-'
      }

      const {unit = 'PHA'} = option || {}
      if (decimals && (value || value === 0)) {
        return `${toFixed(new Decimal(value).div(decimals))}${
          unit ? ` ${unit}` : ''
        }`
      }
      return '-'
    },
    [decimals]
  )
}

export default useFormat
