import vaultAbi from '@/assets/pha_vault_abi'
import {type Hex, erc20Abi, isHex} from 'viem'
import {useReadContract} from 'wagmi'

const assertIsHex = (value?: string) => {
  if (isHex(value)) {
    return value
  }
  throw new Error('Invalid hex string')
}

export const phaContract = assertIsHex(process.env.NEXT_PUBLIC_PHA_CONTRACT)
export const vaultContract = assertIsHex(process.env.NEXT_PUBLIC_VAULT_CONTRACT)

export const useAllowance = (address?: Hex) => {
  const {data: allowance} = useReadContract({
    address: phaContract,
    abi: erc20Abi,
    functionName: 'allowance',
    args: address && [address, vaultContract],
    query: {enabled: Boolean(address)},
  })
  return allowance
}

export const useBalance = (address?: Hex) => {
  const {data: balance} = useReadContract({
    address: phaContract,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: address && [address],
    query: {enabled: Boolean(address)},
  })
  return balance
}

export const useShares = (address?: Hex) => {
  const {data: shares} = useReadContract({
    address: vaultContract,
    abi: vaultAbi,
    functionName: 'balanceOf',
    args: address && [address],
    query: {enabled: Boolean(address)},
  })
  return shares
}

export const useTotalAssets = () => {
  const {data: totalAssets} = useReadContract({
    address: vaultContract,
    abi: vaultAbi,
    functionName: 'totalAssets',
  })
  return totalAssets
}

export const useRewardsPerSecond = () => {
  const {data: rewardsPerSecond} = useReadContract({
    address: vaultContract,
    abi: vaultAbi,
    functionName: 'rewardsPerSecond',
  })
  return rewardsPerSecond
}

export const useAssets = (shares?: bigint) => {
  const {data: assets} = useReadContract({
    address: vaultContract,
    abi: vaultAbi,
    functionName: 'convertToAssets',
    args: shares != null ? [shares] : undefined,
    query: {enabled: shares != null},
  })
  return assets
}

export const useLockedAssets = (address?: Hex) => {
  const {data: lockedAssets} = useReadContract({
    address: vaultContract,
    abi: vaultAbi,
    functionName: 'lockedAssets',
    args: address && [address],
    query: {enabled: Boolean(address)},
  })
  return lockedAssets
}
