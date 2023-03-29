import {ASSETS, type AssetId} from '@/config/asset'
import {CHAINS, type ChainId} from '@/config/chain'
import {type Fungible, type Transfer} from '@buildwithsygma/sygma-sdk-core'
import {type TransactionResponse} from '@ethersproject/abstract-provider'
import {type ethers} from 'ethers'

export const transferEvmSygma = async ({
  provider,
  sender,
  amount,
  fromChainId,
  toChainId,
  destinationAccount,
  assetId,
  onReady,
}: {
  provider: ethers.providers.Web3Provider
  sender: string
  amount: string
  fromChainId: ChainId
  toChainId: ChainId
  destinationAccount: string
  assetId: AssetId
  onReady: () => void
}): Promise<TransactionResponse> => {
  const fromChain = CHAINS[fromChainId]
  const toChain = CHAINS[toChainId]
  const asset = ASSETS[assetId]
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
    throw new Error(`Network ${fromChainId} not supported`)
  }
  const to = domains.find((domain) => domain.chainId === toChain.sygmaChainId)
  if (to == null) {
    throw new Error(`Network ${toChainId} not supported`)
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
  const transferTx = await assetTransfer.buildTransferTransaction(transfer, fee)
  const res = await provider.getSigner().sendTransaction(transferTx)
  onReady()
  return res
}
