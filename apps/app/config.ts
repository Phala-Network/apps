import {GraphQLClient} from 'graphql-request'

export const KHALA_ENDPOINTS = [
  'wss://khala-api.phala.network/ws',
  'wss://khala.api.onfinality.io/public-ws',
  'wss://khala-rpc.dwellir.com',
  'wss://kha.api.cardinate.io',
]
export const KHALA_SUBSQUID_URL =
  'https://squid.subsquid.io/khala-computation/graphql'
export const khalaSubsquidClient = new GraphQLClient(KHALA_SUBSQUID_URL)
export const PHALA_ENDPOINTS = [
  'wss://api.phala.network/ws',
  'wss://pha.api.cardinate.io',
]
export const PHALA_SUBSQUID_URL =
  'https://squid.subsquid.io/phala-computation/v/v1/graphql'
export const phalaSubsquidClient = new GraphQLClient(PHALA_SUBSQUID_URL)
export const WPHA_ASSET_ID = 10000
