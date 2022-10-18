import currency from 'currency.js'
import {Decimal} from 'decimal.js'
import React from 'react'

export type BalanceLabelProps = {
  value: Decimal | undefined
  precision?: number
  type?: string
}

function trim(value: string): string {
  const last = value[value.length - 1]

  if (last === '0') {
    return trim(value.slice(0, -1))
  } else {
    return value
  }
}

export const BalanceLabel: React.FC<BalanceLabelProps> = (props) => {
  const {precision = 2, value, type = ''} = props
  const zero = new Decimal(0)

  let balanceDisplay = ''

  if (!value || value.lessThan(zero)) {
    balanceDisplay = '...'
  } else {
    // 1,000.0000
    balanceDisplay = currency(value.toString(), {symbol: '', precision})
      .format()
      .toString()

    // 1,000.
    balanceDisplay = trim(balanceDisplay)

    // 1,000
    if (balanceDisplay[balanceDisplay.length - 1] === '.') {
      balanceDisplay = balanceDisplay.slice(0, -1)
    }

    if (value.equals(zero)) {
      balanceDisplay = '0'
    }
  }

  const result = `${balanceDisplay} ${type}`.trim()

  return <span>{result}</span>
}
