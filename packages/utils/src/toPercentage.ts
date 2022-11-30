import Decimal from 'decimal.js'
import {toFixed} from './toFixed'

export function toPercentage(
  value: Decimal | string | number,
  fractionDigits = 2
): string {
  const decimal = new Decimal(value)

  return `${toFixed(decimal.times(100), fractionDigits)}%`
}
