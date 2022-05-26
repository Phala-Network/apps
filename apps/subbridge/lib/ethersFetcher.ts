import {ChainId} from '@/config/chain'
import {ApiPromise} from '@polkadot/api'
import {hexStripPrefix, u8aToHex} from '@polkadot/util'
import {decodeAddress} from '@polkadot/util-crypto'
import Decimal from 'decimal.js'
import type {BigNumber, ethers} from 'ethers'
import {createChainBridgeData} from './transferByChainBridge'

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

const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'

export const evmChainBridgeEstimatedGasFetcher = async (
  contract: ethers.Contract,
  khalaApi: ApiPromise,
  resourceId: string,
  toChainId: ChainId
): Promise<Decimal> => {
  const estimateGas = await contract.estimateGas.deposit(
    1,
    resourceId,
    await createChainBridgeData(
      khalaApi,
      // Try to use fixed amount to reduce requests
      ALICE,
      '1',
      toChainId
    )
  )

  return new Decimal(estimateGas.toString())
}

export const evmXTokensEstimatedGasFetcher = async (
  contract: ethers.Contract,
  xc20Address: `0x${string}`,
  paraId: number,
  decimals: number
): Promise<Decimal> => {
  const {ethers} = await import('ethers')
  const estimateGas = await contract.estimateGas.transfer(
    xc20Address,
    '1',
    {
      parents: 1,
      interior: [
        ethers.utils.hexZeroPad(ethers.utils.hexlify(paraId), 5),
        `0x01${hexStripPrefix(u8aToHex(decodeAddress(ALICE)))}00`, // AccountKey32 Selector + Address in hex + Network = Any
      ],
    },
    Decimal.pow(10, decimals - 3)
      .times(6)
      .toString()
  )

  return new Decimal(estimateGas.toString())
}
