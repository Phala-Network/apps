import currencyjs from 'currency.js'
import Decimal from 'decimal.js'

function trim(value: string): string {
  const last = value[value.length - 1]

  if (last === '0') {
    return trim(value.slice(0, -1))
  } else {
    return value
  }
}

export function formatCurrency(
  value?: number | string | Decimal,
  currency?: string
): string | null {
  if (value === undefined) return null

  const _value = new Decimal(value)
  const precision = 4
  const type = currency || 'PHA'
  const zero = new Decimal(0)

  let balanceDisplay = ''

  if (!_value || _value.lessThan(zero)) {
    balanceDisplay = '...'
  } else {
    // 1,000.0000
    balanceDisplay = currencyjs(_value.toString(), {symbol: '', precision})
      .format()
      .toString()

    // 1,000.
    balanceDisplay = trim(balanceDisplay)

    // 1,000
    if (balanceDisplay[balanceDisplay.length - 1] === '.') {
      balanceDisplay = balanceDisplay.slice(0, -1)
    }
  }

  if (_value.equals(zero)) {
    balanceDisplay = '0'
  }

  const result = `${balanceDisplay} ${type}`.trim()

  return result
}
