import Decimal from 'decimal.js'

export function toFixed(
  value: number | Decimal | string,
  fractionDigits = 4
): string {
  if (typeof value === 'string') {
    value = new Decimal(value)
  }
  // NOTE: https://stackoverflow.com/a/63988968/7920298
  const str = value.toFixed(fractionDigits, Decimal.ROUND_DOWN)
  if (fractionDigits > 0) {
    return str.replace(/(\.0+|0+)$/, '')
  }

  return str
}
