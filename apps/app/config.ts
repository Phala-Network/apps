import {GraphQLClient} from 'graphql-request'

export const KHALA_ENDPOINTS = [
  'wss://khala-rpc.dwellir.com',
  'wss://khala-api.phala.network/ws',
  'wss://khala.api.onfinality.io/public-ws',
]
export const KHALA_SUBSQUID_URL =
  'https://subsquid.phala.network/khala-computation/graphql'
export const khalaSubsquidClient = new GraphQLClient(KHALA_SUBSQUID_URL)
export const PHALA_ENDPOINTS = [
  'wss://phala-rpc.dwellir.com',
  'wss://api.phala.network/ws',
  'wss://phala.api.onfinality.io/public-ws',
]
export const PHALA_SUBSQUID_URL =
  'https://subsquid.phala.network/phala-computation/graphql'
export const phalaSubsquidClient = new GraphQLClient(PHALA_SUBSQUID_URL)
export const WPHA_ASSET_ID = 10000
