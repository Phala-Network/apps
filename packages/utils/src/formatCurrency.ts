import { isNumber } from '@polkadot/util'

export default function formatCurrency(value: number | string): string {
  let string

  if (isNumber(value)) {
    string = value.toFixed(6).toString()
  } else {
    string = value
  }

  const n = 3
  const re = '\\d(?=(\\d{' + 3 + '})+' + (n > 0 ? '\\.' : '$') + ')'

  return string.replace(new RegExp(re, 'g'), '$&,')
}
