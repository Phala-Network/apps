import {decodeAddress, encodeAddress} from '@polkadot/keyring'
import {hexToU8a, isHex} from '@polkadot/util'

// https://polkadot.js.org/docs/util-crypto/examples/validate-address
export const validateAddress = (address: string): boolean => {
  // forbid public key
  if (address.startsWith('0x')) return false
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address))

    return true
  } catch (error) {
    return false
  }
}
