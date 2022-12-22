import {decodeAddress, encodeAddress} from '@polkadot/keyring'

const transformAddress = (address: string, ss58Format: number): string => {
  return encodeAddress(decodeAddress(address), ss58Format)
}

export default transformAddress
