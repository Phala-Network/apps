import {ApiPromise} from '@polkadot/api'
import Decimal from 'decimal.js'
import type {BigNumber, ethers} from 'ethers'
import {createEthereumToKhalaData} from './createEthereumToKhalaData'

export const ethersBalanceFetcher = async (
  provider: ethers.providers.Web3Provider,
  address: `0x${string}`
): Promise<Decimal> => {
  const {ethers} = await import('ethers')
  const balance = await provider.getBalance(address)
  return new Decimal(ethers.utils.formatEther(balance))
}

export const ethersContractBalanceFetcher = async (
  contract: ethers.Contract,
  account: `0x${string}`,
  decimals: number
): Promise<Decimal> => {
  const {ethers} = await import('ethers')
  const balance = (await contract.balanceOf(account)) as BigNumber

  return new Decimal(ethers.utils.formatUnits(balance, decimals))
}

export const ethersContractAllowanceFetcher = async (
  contract: ethers.Contract,
  owner: `0x${string}`,
  spender: `0x${string}`
): Promise<boolean> => {
  const balance = (await contract.allowance(owner, spender)) as BigNumber

  // FIXME: should compare to amount user inputted
  return balance.gt(0)
}

export const ethersGasPriceFetcher = async (
  provider: ethers.providers.Web3Provider
) => {
  const {ethers} = await import('ethers')
  return new Decimal(ethers.utils.formatEther(await provider.getGasPrice()))
}

export const ethereumToKhalaEstimatedGasFetcher = async (
  contract: ethers.Contract,
  khalaApi: ApiPromise,
  resourceId: string
): Promise<Decimal> => {
  const estimateGas = await contract.estimateGas.deposit(
    1,
    resourceId,
    await createEthereumToKhalaData(
      khalaApi,
      // Try to use fixed amount to reduce requests
      '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      '1'
    )
  )

  return new Decimal(estimateGas.toString())
}
