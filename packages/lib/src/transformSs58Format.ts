import {decodeAddress, encodeAddress} from '@polkadot/keyring'

const transformSs58Format = (address: string, ss58Format: number): string => {
  try {
    return encodeAddress(decodeAddress(address), ss58Format)
  } catch (err) {
    return ''
  }
}

export default transformSs58Format
