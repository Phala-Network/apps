import type {Asset} from '@/config/asset'
import {CHAINS, type Chain} from '@/config/chain'
import type {
  EVMAssetTransfer,
  EvmFee,
  Fungible,
  Transfer,
} from '@buildwithsygma/sygma-sdk-core'
import type {PopulatedTransaction, ethers} from 'ethers'

export const getEvmSygmaTransfer = async (
  provider: ethers.providers.Web3Provider,
  fromChain: Chain,
  toChain: Chain,
  sender: string,
  asset: Asset,
  destinationAccount: string,
  amount: string,
): Promise<{
  assetTransfer: EVMAssetTransfer
  transfer: Transfer<Fungible>
  fee: EvmFee
  tx: PopulatedTransaction
}> => {
  const {EVMAssetTransfer, Environment} = await import(
    '@buildwithsygma/sygma-sdk-core'
  )
  const assetTransfer = new EVMAssetTransfer()
  await assetTransfer.init(
    provider,
    fromChain.isTest === true ? Environment.TESTNET : Environment.MAINNET,
  )

  let destinationChainId: number | undefined
  let parachainId: number | undefined

  if (
    toChain.id === 'phala' ||
    toChain.id === 'khala' ||
    toChain.id === 'rhala'
  ) {
    destinationChainId = toChain.sygmaChainId
  } else {
    parachainId = toChain.paraId
    if (toChain.id === 'astar') {
      destinationChainId = CHAINS.phala.sygmaChainId
    }
  }

  if (destinationChainId == null || asset.sygmaResourceId == null) {
    throw new Error('Chain or asset not supported')
  }

  const transfer = await assetTransfer.createFungibleTransfer(
    sender,
    destinationChainId,
    destinationAccount,
    asset.sygmaResourceId,
    amount,
    parachainId,
  )

  const fee = await assetTransfer.getFee(transfer)
  const tx = await assetTransfer.buildTransferTransaction(transfer, fee)

  return {assetTransfer, transfer, fee, tx}
}
