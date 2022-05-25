import type {ApiPromise} from '@polkadot/api'
import type {ethers} from 'ethers'
import {createEthereumToKhalaData} from './createEthereumToKhalaData'

export const transferByChainBridge = async ({
  contract,
  khalaApi,
  destinationChainId,
  destinationAccount,
  resourceId,
  amount,
}: {
  contract: ethers.Contract
  khalaApi: ApiPromise
  destinationChainId: number
  resourceId: string
  destinationAccount: string
  amount: string
}): Promise<{hash: string}> => {
  return contract.deposit(
    destinationChainId,
    resourceId,
    await createEthereumToKhalaData(khalaApi, destinationAccount, amount)
  )
}
