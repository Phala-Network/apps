import {VAULT_CONTRACT_ADDRESS, goldskyClient} from '@/config'
import {useQuery} from '@tanstack/react-query'
import {gql} from 'graphql-request'

// GraphQL queries for vault operations
const DEPOSITS_QUERY = gql`
  query Deposits($first: Int!, $skip: Int!, $owner: String!, $vaultContract: String!) {
    deposits(
      first: $first
      skip: $skip
      orderBy: timestamp_
      orderDirection: desc
      where: {and: [{owner: $owner}, {sender_not: $vaultContract}]}
    ) {
      id
      shares
      timestamp_
      transactionHash_
      owner
      sender
      assets
      block_number
      contractId_
    }
  }
`

const CLAIMEDS_QUERY = gql`
  query Claimeds($first: Int!, $skip: Int!, $owner: String!) {
    claimeds(
      first: $first
      skip: $skip
      orderBy: timestamp_
      orderDirection: desc
      where: {owner: $owner}
    ) {
      id
      receiver
      transactionHash_
      timestamp_
      owner
      assets
      block_number
      contractId_
      caller
    }
  }
`

// Types for the query responses
export interface Deposit {
  id: string
  shares: string
  timestamp_: string
  transactionHash_: string
  owner: string
  sender: string
  assets: string
  block_number: string
  contractId_: string
}

export interface Claimed {
  id: string
  receiver: string
  transactionHash_: string
  timestamp_: string
  owner: string
  assets: string
  block_number: string
  contractId_: string
  caller: string
}

export interface DepositsResponse {
  deposits: Deposit[]
}

export interface ClaimedsResponse {
  claimeds: Claimed[]
}

// Hook for fetching deposits with pagination
export const useDepositsQuery = (
  owner: string | undefined,
  page = 1,
  pageSize = 20,
) => {
  return useQuery({
    queryKey: ['deposits', owner, page, pageSize],
    queryFn: async (): Promise<DepositsResponse> => {
      if (!owner || owner === '') {
        return {deposits: []}
      }
      try {
        return await goldskyClient.request(DEPOSITS_QUERY, {
          first: pageSize,
          skip: (page - 1) * pageSize,
          owner: owner.toLowerCase(),
          vaultContract: VAULT_CONTRACT_ADDRESS.toLowerCase(),
        })
      } catch (error) {
        console.error('Error fetching deposits:', error)
        return {deposits: []}
      }
    },
    enabled: !!owner && owner !== '',
    retry: 2,
  })
}

// Hook for fetching claimeds with pagination
export const useClaimedsQuery = (
  owner: string | undefined,
  page = 1,
  pageSize = 20,
) => {
  return useQuery({
    queryKey: ['claimeds', owner, page, pageSize],
    queryFn: async (): Promise<ClaimedsResponse> => {
      if (!owner || owner === '') {
        return {claimeds: []}
      }
      try {
        return await goldskyClient.request(CLAIMEDS_QUERY, {
          first: pageSize,
          skip: (page - 1) * pageSize,
          owner: owner.toLowerCase(),
        })
      } catch (error) {
        console.error('Error fetching claimeds:', error)
        return {claimeds: []}
      }
    },
    enabled: !!owner && owner !== '',
    retry: 2,
  })
}
