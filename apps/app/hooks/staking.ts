import vaultAbi from '@/assets/pha_vault_abi'
import {VAULT_CONTRACT_ADDRESS} from '@/config'
import {PHA_CONTRACT_ADDRESS} from '@/config'
import Decimal from 'decimal.js'
import {useMemo} from 'react'
import {type Hex, erc20Abi} from 'viem'
import {useReadContract} from 'wagmi'

export const useAllowance = (address?: Hex) => {
  const {data: allowance} = useReadContract({
    address: PHA_CONTRACT_ADDRESS,
    abi: erc20Abi,
    functionName: 'allowance',
    args: address && [address, VAULT_CONTRACT_ADDRESS],
    query: {enabled: Boolean(address), refetchInterval: 3_000},
  })
  return allowance
}

export const useBalance = (address?: Hex) => {
  const {data: balance} = useReadContract({
    address: PHA_CONTRACT_ADDRESS,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: address && [address],
    query: {enabled: Boolean(address), refetchInterval: 3_000},
  })
  return balance
}

export const useShares = (address?: Hex) => {
  const {data: shares} = useReadContract({
    address: VAULT_CONTRACT_ADDRESS,
    abi: vaultAbi,
    functionName: 'balanceOf',
    args: address && [address],
    query: {enabled: Boolean(address), refetchInterval: 3_000},
  })
  return shares
}

export const useTotalAssets = () => {
  const {data: totalAssets} = useReadContract({
    address: VAULT_CONTRACT_ADDRESS,
    abi: vaultAbi,
    functionName: 'totalAssets',
    query: {refetchInterval: 3_000},
  })
  return totalAssets
}

export const useRewardRate = () => {
  const {data: rewardRate} = useReadContract({
    address: VAULT_CONTRACT_ADDRESS,
    abi: vaultAbi,
    functionName: 'rewardRate',
    query: {refetchInterval: 3_000},
  })
  const {data: treasuryRatio} = useReadContract({
    address: VAULT_CONTRACT_ADDRESS,
    abi: vaultAbi,
    functionName: 'treasuryRatio',
    query: {refetchInterval: 3_000},
  })
  if (treasuryRatio == null || rewardRate == null) {
    return
  }
  return (rewardRate * (10000n - treasuryRatio)) / 10000n
}

export const useSharePrice = () => {
  const {data: sharePrice} = useReadContract({
    address: VAULT_CONTRACT_ADDRESS,
    abi: vaultAbi,
    functionName: 'convertToAssets',
    args: [1_000_000_000_000_000_000n],
    query: {refetchInterval: 3_000},
  })
  return sharePrice
}

export const useSharesToAssets = (shares?: bigint | null) => {
  const sharePrice = useSharePrice()
  const assets = useMemo(() => {
    if (sharePrice == null || shares == null) {
      return null
    }
    return BigInt(
      Decimal.mul(sharePrice.toString(), shares.toString())
        .div(1e18)
        .toDP(0)
        .toString(),
    )
  }, [sharePrice, shares])
  return assets
}

export const useAssetsToShares = (assets?: bigint | null) => {
  const sharePrice = useSharePrice()
  const shares = useMemo(() => {
    if (sharePrice == null || assets == null) {
      return null
    }
    return BigInt(
      Decimal.mul(assets.toString(), 1e18)
        .div(sharePrice.toString())
        .toDP(0)
        .toString(),
    )
  }, [sharePrice, assets])
  return shares
}

export const useUnlockRequests = (address?: Hex) => {
  const {data: unlockRequests} = useReadContract({
    address: VAULT_CONTRACT_ADDRESS,
    abi: vaultAbi,
    functionName: 'unlockRequests',
    args: address && [address],
    query: {enabled: Boolean(address), refetchInterval: 3_000},
  })
  if (unlockRequests != null) {
    return unlockRequests.map((request) => ({
      ...request,
      startTime: Number.parseInt(request.startTime.toString()) * 1000,
    }))
  }
}

export const useUnlockPeriod = () => {
  const {data: unlockPeriod} = useReadContract({
    address: VAULT_CONTRACT_ADDRESS,
    abi: vaultAbi,
    functionName: 'unlockPeriod',
  })
  if (unlockPeriod != null) {
    return Number.parseInt((unlockPeriod * 1000n).toString())
  }
}

export const useMaxUnlockRequests = () => {
  const {data: maxUnlockRequests} = useReadContract({
    address: VAULT_CONTRACT_ADDRESS,
    abi: vaultAbi,
    functionName: 'maxUnlockRequests',
  })
  if (maxUnlockRequests != null) {
    return Number.parseInt(maxUnlockRequests.toString())
  }
}
