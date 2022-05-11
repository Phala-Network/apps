import type {ApiPromise} from '@polkadot/api'
import {u8aToHex} from '@polkadot/util'
import {decodeAddress} from '@polkadot/util-crypto'

export const createEthereumToKhalaData = async (
  khalaApi: ApiPromise,
  destinationAccount: string,
  amount: string
): Promise<string> => {
  const {ethers} = await import('ethers')
  const dest = khalaApi
    .createType('XcmV1MultiLocation', {
      parents: 0,
      interior: khalaApi.createType('Junctions', {
        X1: khalaApi.createType('XcmV1Junction', {
          AccountId32: {
            network: khalaApi.createType('XcmV0JunctionNetworkId', 'Any'),
            id: u8aToHex(decodeAddress(destinationAccount)),
          },
        }),
      }),
    })
    .toHex()

  const data = ethers.utils.hexConcat([
    ethers.utils.hexZeroPad(ethers.BigNumber.from(amount).toHexString(), 32),
    ethers.utils.hexZeroPad(ethers.utils.hexlify((dest.length - 2) / 2), 32),
    dest,
  ])

  return data
}
