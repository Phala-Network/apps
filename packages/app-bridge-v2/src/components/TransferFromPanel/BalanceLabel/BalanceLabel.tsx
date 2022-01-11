import currency from 'currency.js'
import Decimal from 'decimal.js'
import {FC} from 'react'
import styled from 'styled-components'
import {useBridgePage} from '../../../useBridgePage'

const Root = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  /* identical to box height, or 114% */
  text-align: right;
  /* Gy 003 */
  color: #8c8c8c;
`

function trim(value: string): string {
  const last = value[value.length - 1]

  if (last === '0') {
    return trim(value.slice(0, -1))
  } else {
    return value
  }
}

export const BalanceLabel: FC = () => {
  const {currentBalance} = useBridgePage()

  const value = currentBalance
  const precision = 4
  const type = 'PHA'
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
  }

  if (value.equals(zero)) {
    balanceDisplay = '0'
  }

  const result = `${balanceDisplay} ${type}`.trim()

  return <Root>Balance: {result}</Root>
}
