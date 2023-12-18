import {ASSETS, type AssetId} from '@/config/asset'
import {CHAINS, type ChainId} from '@/config/chain'
import {hexStripPrefix, u8aToHex} from '@polkadot/util'
import {decodeAddress} from '@polkadot/util-crypto'
import Decimal from 'decimal.js'
import type {ContractTransaction} from 'ethers'
import {ethers} from 'ethers'

export const transferByEvmXTokens = async ({
  contract,
  assetId,
  destinationAccount,
  amount,
  fromChainId,
  toChainId,
  decimals,
}: {
  contract: ethers.Contract
  assetId: AssetId
  destinationAccount: string
  amount: string
  fromChainId: ChainId
  toChainId: ChainId
  decimals: number
}): Promise<ContractTransaction> => {
  const asset = ASSETS[assetId]
  const toChain = CHAINS[toChainId]

  if (asset.xc20Address?.[fromChainId] == null || toChain.paraId == null) {
    throw new Error('Transfer missing required parameters')
  }

  return contract.transfer(
    asset.xc20Address[fromChainId],
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
      .toString(),
  )
}
