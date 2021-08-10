import Decimal from 'decimal.js'

export default function toFixed(
  value: number | Decimal,
  fractionDigits = 4
): string {
  // NOTE: https://stackoverflow.com/a/63988968/7920298
  const str = value.toFixed(fractionDigits)
  if (fractionDigits > 0) {
    return str.replace(/(\.0+|0+)$/, '')
  }

  return str
}
