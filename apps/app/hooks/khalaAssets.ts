import khalaClaimerAbi from '@/assets/khala_claimer_abi'
import {KHALA_CLAIMER_CONTRACT_ADDRESS} from '@/config'
import {useQuery} from '@tanstack/react-query'
import type {Hex} from 'viem'
import {usePublicClient, useReadContract} from 'wagmi'
import wretch from 'wretch'

export const khalaAssetsApi = wretch(
  'https://dbcac8a0d67d837a93e8c1db0886c8f1acdc599d-8080.dstack-prod4.phala.network',
)

export const useKhalaAssetsQuery = (address?: string) => {
  return useQuery({
    queryKey: ['khala-assets', address],
    queryFn: () =>
      khalaAssetsApi
        .get(`/account/${address}`)
        .json<{free: string; staked: string; pwRefund: string}>(),
    enabled: address != null,
  })
}

export const useClaimStatus = (address?: Hex) => {
  const {data: claimed, refetch} = useReadContract({
    address: KHALA_CLAIMER_CONTRACT_ADDRESS,
    abi: khalaClaimerAbi,
    functionName: 'claimed',
    args: address && [address],
    query: {
      enabled: Boolean(address),
      refetchInterval: (query) => (query.state.data ? false : 3000),
    },
  })
  const publicClient = usePublicClient()
  const {data: log} = useQuery({
    queryKey: ['khala-claim-logs', address, publicClient?.chain.id],
    queryFn: async () => {
      if (publicClient == null) {
        return
      }
      const event = khalaClaimerAbi.find(
        (item) => item.type === 'event' && item.name === 'Claimed',
      )
      if (event == null) {
        return
      }
      const logs = await publicClient.getLogs({
        address: KHALA_CLAIMER_CONTRACT_ADDRESS,
        event,
        args: {user: address},
        fromBlock: 0n,
      })
      return logs[0]
    },
    enabled: claimed === true && publicClient != null && address != null,
  })
  return {
    claimed,
    log,
    refetch,
  }
}
