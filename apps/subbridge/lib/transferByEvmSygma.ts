import {ASSETS, type AssetId} from '@/config/asset'
import {CHAINS, type ChainId} from '@/config/chain'
import type {TransactionResponse} from '@ethersproject/abstract-provider'
import type {ethers} from 'ethers'
import {getEvmSygmaTransfer} from './evmSygma'

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
  const {tx} = await getEvmSygmaTransfer(
    provider,
    fromChain,
    toChain,
    sender,
    asset,
    destinationAccount,
    amount,
  )
  const res = await provider.getSigner().sendTransaction(tx)
  onReady()
  return res
}
