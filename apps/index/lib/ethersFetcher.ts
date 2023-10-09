import Decimal from 'decimal.js'
import type {ethers} from 'ethers'

export const ethersBalanceFetcher = async ([provider, address]: [
  ethers.BrowserProvider,
  `0x${string}`,
]): Promise<Decimal> => {
  const {ethers} = await import('ethers')
  const balance = await provider.getBalance(address)
  return new Decimal(ethers.formatEther(balance))
}

export const ethersContractBalanceFetcher = async ([
  contract,
  account,
  decimals,
]: [ethers.Contract, `0x${string}`, number]): Promise<Decimal> => {
  const {ethers} = await import('ethers')
  const balance = (await contract.balanceOf(account)) as bigint

  return new Decimal(ethers.formatUnits(balance, decimals))
}

export const ethersContractAllowanceFetcher = async ([
  contract,
  owner,
  spender,
]: [ethers.Contract, `0x${string}`, `0x${string}`]): Promise<Decimal> => {
  const balance = (await contract.allowance(owner, spender)) as bigint

  return new Decimal(balance.toString())
}

// export const ethersGasPriceFetcher = async (
//   provider: ethers.BrowserProvider
// ): Promise<Decimal> => {
//   const {ethers} = await import('ethers')
//   return new Decimal(ethers.formatEther(await provider.gaspri()))
// }

// const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
