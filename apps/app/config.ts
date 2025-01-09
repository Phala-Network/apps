import {GraphQLClient} from 'graphql-request'

export const PHALA_ENDPOINTS = [
  'wss://phala-rpc.dwellir.com',
  'wss://api.phala.network/ws',
  'wss://phala.api.onfinality.io/public-ws',
]
export const subsquidClient = new GraphQLClient(
  'https://subsquid.phala.network/phala-computation/graphql',
)

export const WPHA_ASSET_ID = 10000
