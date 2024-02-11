import {decodeAddress, encodeAddress} from '@polkadot/keyring'
import {hexToU8a, isHex} from '@polkadot/util'

// https://polkadot.js.org/docs/util-crypto/examples/validate-address
export const validateAddress = (address: string): boolean => {
  try {
    // forbid public key
    if (address.startsWith('0x')) return false

    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address))

    return true
  } catch (error) {
    return false
  }
}
