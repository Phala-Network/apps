import Decimal from 'decimal.js'
import {toFixed} from './toFixed'

export function formatCurrency(value: Decimal | string | number): string {
  const fixedValue = toFixed(
    typeof value === 'string' ? new Decimal(value) : value,
    2
  )

  // @see https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  return fixedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
