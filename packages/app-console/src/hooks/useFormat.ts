import {useCallback} from 'react'
import Decimal from 'decimal.js'
import {useApiPromise} from '@phala/react-libs/esm/polkadot/hooks/useApiPromise'
import {useDecimalJsTokenDecimalMultiplier} from '@phala/react-libs/esm/polkadot/useTokenDecimals'
import {toFixed} from '@phala/utils'

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
