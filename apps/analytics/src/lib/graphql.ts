import {GraphQLClient} from 'graphql-request'

export const phatOffchainClient = new GraphQLClient(
  'https://offchain-metrics.phala.network/v1/graphql',
)

export const phatSquidClient = new GraphQLClient(
  'https://squid.subsquid.io/phat-contract-squid/graphql',
)

export const phalaSquidClient = new GraphQLClient(
  'https://subsquid.phala.network/phala-computation-next/graphql',
)

export const khalaSquidClient = new GraphQLClient(
  'https://subsquid.phala.network/khala-computation-next/graphql',
)
