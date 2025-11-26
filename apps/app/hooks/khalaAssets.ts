'use client'

import khalaClaimerAbi from '@/assets/khala_claimer_abi'
import {
  KHALA_CLAIMER_CONTRACT_ADDRESS,
  PHALA_CLAIMER_CONTRACT_ADDRESS,
} from '@/config'
import {useQuery} from '@tanstack/react-query'
import type {Hex} from 'viem'
import {useReadContract} from 'wagmi'
import wretch from 'wretch'

export type ChainType = 'khala' | 'phala'

export const khalaAssetsApi = wretch(
  'https://dbcac8a0d67d837a93e8c1db0886c8f1acdc599d-8080.dstack-prod4.phala.network',
)

export const phalaAssetsApi = wretch(
  'https://19c1b60e7668801155c1ae3fb47701cdcc408298-8080.dstack-pha-prod7.phala.network',
)

// GraphQL client for Khala claimer subgraph
export const khalaClaimerGraphQL = wretch(
  'https://api.goldsky.com/api/public/project_cmdgxxcewrqdi01wx9e7md0ek/subgraphs/khala-claimer/1.0.0/gn',
)

// GraphQL client for Phala claimer subgraph
export const phalaClaimerGraphQL = wretch(
  'https://api.goldsky.com/api/public/project_cmdgxxcewrqdi01wx9e7md0ek/subgraphs/phala-claimer/1.0.0/gn',
)

export const useAssetsQuery = (
  address?: string,
  chain: ChainType = 'khala',
) => {
  const api = chain === 'khala' ? khalaAssetsApi : phalaAssetsApi
  return useQuery({
    queryKey: [`${chain}-assets`, address],
    queryFn: () =>
      api
        .get(`/account/${address}`)
        .json<{free: string; staked: string; pwRefund: string}>(),
    enabled: address != null,
  })
}

export const useKhalaAssetsQuery = (address?: string) => {
  return useAssetsQuery(address, 'khala')
}

export const usePhalaAssetsQuery = (address?: string) => {
  return useAssetsQuery(address, 'phala')
}

export const useClaimStatus = (address?: Hex, chain: ChainType = 'khala') => {
  const contractAddress =
    chain === 'khala'
      ? KHALA_CLAIMER_CONTRACT_ADDRESS
      : PHALA_CLAIMER_CONTRACT_ADDRESS
  const graphqlClient =
    chain === 'khala' ? khalaClaimerGraphQL : phalaClaimerGraphQL

  const {data: claimed, refetch} = useReadContract({
    address: contractAddress,
    abi: khalaClaimerAbi,
    functionName: 'claimed',
    args: address && [address],
    query: {
      enabled: Boolean(address),
      refetchInterval: (query) => (query.state.data ? false : 3000),
    },
  })

  const {data: claimLog} = useQuery({
    queryKey: [`${chain}-claim-logs`, address],
    queryFn: async () => {
      if (!address) {
        return null
      }

      // For Phala, query ClaimedAndBridged event; for Khala, query Claimed event
      const query =
        chain === 'phala'
          ? `
        query GetClaimedAndBridgedLog($user: String!) {
          claimedAndBridgeds(first: 1, where: {user: $user}) {
            l1Receiver
            l2Receiver
            transactionHash_
            timestamp_
          }
        }
      `
          : `
        query GetClaimedLog($user: String!) {
          claimeds(first: 1, where: {user: $user}) {
            receiver
            transactionHash_
            timestamp_
          }
        }
      `

      const response = await graphqlClient
        .post({
          query,
          variables: {user: address.toLowerCase()},
        })
        .json<{
          data: {
            claimeds?: Array<{
              receiver: string
              transactionHash_: string
              timestamp_: string
            }>
            claimedAndBridgeds?: Array<{
              l1Receiver: string
              l2Receiver: string
              transactionHash_: string
              timestamp_: string
            }>
          }
        }>()

      // Normalize the response to have a consistent 'receiver' field
      if (chain === 'phala' && response.data.claimedAndBridgeds) {
        const logs = response.data.claimedAndBridgeds
        return logs.length > 0
          ? {
              receiver: logs[0].l2Receiver, // Use l2Receiver as the main receiver
              l1Receiver: logs[0].l1Receiver,
              transactionHash_: logs[0].transactionHash_,
              timestamp_: logs[0].timestamp_,
            }
          : null
      }

      const logs = response.data.claimeds
      return logs && logs.length > 0 ? logs[0] : null
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
