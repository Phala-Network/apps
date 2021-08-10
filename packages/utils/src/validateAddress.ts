import { validateAddress } from '@polkadot/util-crypto'

export default function (address: string): boolean {
  try {
    return validateAddress(address)
  } catch (e) {
    return false
  }
}
