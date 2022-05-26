import {AssetId, ASSETS} from '@/config/asset'
import {ChainId, CHAINS} from '@/config/chain'
import {hexStripPrefix, u8aToHex} from '@polkadot/util'
import {decodeAddress} from '@polkadot/util-crypto'
import Decimal from 'decimal.js'
import type {ethers} from 'ethers'

export const transferByEvmXTokens = async ({
  contract,
  assetId,
  destinationAccount,
  amount,
  toChainId,
  decimals,
}: {
  contract: ethers.Contract
  assetId: AssetId
  destinationAccount: string
  amount: string
  toChainId: ChainId
  decimals: number
}): Promise<{hash: string}> => {
  const {ethers} = await import('ethers')
  const asset = ASSETS[assetId]
  const toChain = CHAINS[toChainId]

  if (!asset.xc20Address || !toChain.paraId) {
    throw new Error('Transfer missing required parameters')
  }

  return contract.transfer(
    asset.xc20Address,
    amount,
    {
      parents: 1,
      interior: [
        ethers.utils.hexZeroPad(ethers.utils.hexlify(toChain.paraId), 5),
        `0x01${hexStripPrefix(u8aToHex(decodeAddress(destinationAccount)))}00`, // AccountKey32 Selector + Address in hex + Network = Any
      ],
    },
    Decimal.pow(10, decimals - 3)
      .times(6)
      .toString()
  )
}
