import type Decimal from 'decimal.js'

const compactFormat = (
  value: Decimal | number,
  maximumFractionDigits = 2,
): string => {
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits,
  }).format(
    typeof value === 'number' ? value : BigInt(value.floor().toString()),
  )
}

export default compactFormat
