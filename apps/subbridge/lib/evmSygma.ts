import {type Asset} from '@/config/asset'
import {type Chain} from '@/config/chain'
import {
  type EVMAssetTransfer,
  type EvmFee,
  type Fungible,
  type Transfer,
} from '@buildwithsygma/sygma-sdk-core'
import {type PopulatedTransaction, type ethers} from 'ethers'

export const getEvmSygmaTransfer = async (
  provider: ethers.providers.Web3Provider,
  fromChain: Chain,
  toChain: Chain,
  sender: string,
  asset: Asset,
  destinationAccount: string,
  amount: string
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
    fromChain.isTest === true ? Environment.TESTNET : Environment.MAINNET
  )
  const domains = assetTransfer.config.getDomains()
  const resources = assetTransfer.config.getDomainResources()

  const erc20Resource = resources.find(
    (resource) => resource.symbol === asset.symbol.toUpperCase()
  )
  if (erc20Resource == null) {
    throw new Error('Resource not found')
  }
  const from = domains.find(
    (domain) => domain.chainId === fromChain.sygmaChainId
  )
  if (from == null) {
    throw new Error(`Network ${fromChain.id} not supported`)
  }
  const to = domains.find((domain) => domain.chainId === toChain.sygmaChainId)
  if (to == null) {
    throw new Error(`Network ${toChain.id} not supported`)
  }

  const transfer: Transfer<Fungible> = {
    sender,
    amount: {amount},
    from,
    to,
    resource: erc20Resource,
    recipient: destinationAccount,
  }
  const fee = await assetTransfer.getFee(transfer)
  const tx = await assetTransfer.buildTransferTransaction(transfer, fee)

  return {assetTransfer, transfer, fee, tx}
}
