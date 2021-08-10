import { isNumber } from '@polkadot/util'

export function formatCurrency(value: number | string): string {
  let string

  if (isNumber(value)) {
    string = value.toFixed(6).toString()
  } else {
    string = value
  }

  const n = 3
  const re = '\\d(?=(\\d{' + 3 + '})+' + (n > 0 ? '\\.' : '$') + ')'

  console.log(string)

  return string.replace(new RegExp(re, 'g'), '$&,')
}
