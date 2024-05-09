import {GraphQLClient} from 'graphql-request'

export const KHALA_ENDPOINTS = [
  'wss://khala-rpc.dwellir.com',
  'wss://khala-api.phala.network/ws',
  'wss://khala.api.onfinality.io/public-ws',
]
export const khalaSubsquidClient = new GraphQLClient(
  'https://subsquid.phala.network/khala-computation/graphql',
)
export const PHALA_ENDPOINTS = [
  'wss://phala-rpc.dwellir.com',
  'wss://api.phala.network/ws',
  'wss://phala.api.onfinality.io/public-ws',
]
export const phalaSubsquidClient = new GraphQLClient(
  'https://subsquid.phala.network/phala-computation/graphql',
)
export const subsquidClient = {
  khala: khalaSubsquidClient,
  phala: phalaSubsquidClient,
} as const
export const WPHA_ASSET_ID = 10000
