import { ApiPromise } from '@polkadot/api'
import { Balance } from '@polkadot/types/interfaces'
import { BN } from '@polkadot/util'
import { Decimal } from 'decimal.js'

export function decimalToBN(value: Decimal, factor?: Decimal): BN
export function decimalToBN(value?: Decimal, factor?: Decimal): BN | undefined {
    return value !== undefined ? new BN((factor !== undefined ? value.mul(factor) : value).toString()) : undefined
}

export function decimalToBalance(value: Decimal, api: ApiPromise): Balance
export function decimalToBalance(value: Decimal, api?: ApiPromise): Balance | undefined {
    return api?.createType('Balance', decimalToBN(value))
}

export function balanceToDecimal(value: Balance | BN, factor: Decimal): Decimal {
    return new Decimal(value.toString()).div(factor)
}
