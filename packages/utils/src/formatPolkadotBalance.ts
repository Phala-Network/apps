import {formatBalance as format} from '@polkadot/util'

export function formatPolkadotBalance(
  balance: string | number,
  decimals = 12
): [string, string] {
  let value = '0'
  let unit = 'PHA'

  // format balance use polkadot's decimals
  if (balance) {
    balance = format(balance, {
      withUnit: 'PHA',
      decimals,
    })

    const result = balance?.split?.(' ')

    value = result[0] || '0'
    unit = result[1] || 'PHA'

    // dont show kPHA value
    if (unit[0] === 'k') {
      value = (parseFloat(value) * 1000).toString()
      unit = 'PHA'
    }
  }

  return [value, unit]
}
