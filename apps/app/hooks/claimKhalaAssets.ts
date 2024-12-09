import khalaClaimerAbi from '@/assets/khala_claimer_abi'
import {useQuery} from '@tanstack/react-query'
import {type Hex, isHex} from 'viem'
import {usePublicClient, useReadContract} from 'wagmi'
import {} from './staking'

const assertIsHex = (value?: string) => {
  if (isHex(value)) {
    return value
  }
  throw new Error('Invalid hex string')
}

export const khalaClaimerAddress = assertIsHex(
  process.env.NEXT_PUBLIC_KHALA_CLAIMER_CONTRACT,
)

export const useClaimStatus = (address?: Hex) => {
  const {data: claimed} = useReadContract({
    address: khalaClaimerAddress,
    abi: khalaClaimerAbi,
    functionName: 'claimed',
    args: address && [address],
    query: {enabled: Boolean(address)},
  })
  const publicClient = usePublicClient()
  const {data: logs} = useQuery({
    queryKey: ['khala-claim-logs', address, publicClient?.chain.id],
    queryFn: async () => {
      const logs = await publicClient?.getLogs({
        address: khalaClaimerAddress,
        event: khalaClaimerAbi.find(
          (item) => item.type === 'event' && item.name === 'Claimed',
        ),
        args: {user: address},
      })
      return logs
    },
    enabled: claimed === true && publicClient?.chain.name === 'ethereum',
  })
  return {
    claimed,
    logs,
  }
}
