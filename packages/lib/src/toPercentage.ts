import Decimal from 'decimal.js'
import {toFixed} from './toFixed'

export function toPercentage(
  value: Decimal | string | number | null | undefined,
  fractionDigits = 2,
): string | undefined | null {
  if (value == null) return null
  const decimal = new Decimal(value)

  return `${toFixed(decimal.times(100), fractionDigits)}%`
}
