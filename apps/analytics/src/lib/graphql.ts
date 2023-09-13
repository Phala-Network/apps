import {GraphQLClient} from 'graphql-request'

export const phatOffchainClient = new GraphQLClient(
  'https://offchain-metrics.phala.network/v1/graphql',
)

export const phatSquidClient = new GraphQLClient(
  'https://squid.subsquid.io/phat-contract-squid/graphql',
)

export const phalaSquidClient = new GraphQLClient(
  'https://squid.subsquid.io/phala-computation/graphql',
)

export const khalaSquidClient = new GraphQLClient(
  'https://squid.subsquid.io/khala-computation/graphql',
)
