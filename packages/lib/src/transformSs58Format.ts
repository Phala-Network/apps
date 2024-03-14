import {decodeAddress, encodeAddress} from '@polkadot/keyring'

const transformSs58Format = (address: string, ss58Format: number): string => {
  return encodeAddress(decodeAddress(address), ss58Format)
}

export default transformSs58Format
