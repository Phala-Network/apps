import khalaClaimerAbi from '@/assets/khala_claimer_abi'
import {KHALA_CLAIMER_CONTRACT_ADDRESS} from '@/config'
import {useQuery} from '@tanstack/react-query'
import type {Hex} from 'viem'
import {useReadContract} from 'wagmi'
import wretch from 'wretch'

export const khalaAssetsApi = wretch(
  'https://dbcac8a0d67d837a93e8c1db0886c8f1acdc599d-8080.dstack-prod4.phala.network',
)

// GraphQL client for Khala claimer subgraph
export const khalaClaimerGraphQL = wretch(
  'https://api.goldsky.com/api/public/project_cmdgxxcewrqdi01wx9e7md0ek/subgraphs/khala-claimer/1.0.0/gn',
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

  const {data: claimLog} = useQuery({
    queryKey: ['khala-claim-logs', address],
    queryFn: async () => {
      if (!address) {
        return null
      }

      const query = `
        query GetClaimedLog($user: String!) {
          claimeds(first: 1, where: {user: $user}) {
            receiver
            transactionHash_
            timestamp_
          }
        }
      `

      const response = await khalaClaimerGraphQL
        .post({
          query,
          variables: {user: address.toLowerCase()},
        })
        .json<{
          data: {
            claimeds: Array<{
              receiver: string
              transactionHash_: string
              timestamp_: string
            }>
          }
        }>()

      return response.data.claimeds.length > 0
        ? response.data.claimeds[0]
        : null
    },
    enabled: claimed === true && address != null,
    refetchInterval: (query) => (query.state.data ? false : 3000),
  })

  return {
    claimed,
    log: claimLog,
    refetch,
  }
}
