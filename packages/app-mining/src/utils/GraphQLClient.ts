import {GraphQLClient} from 'graphql-request'

export const client = new GraphQLClient(
  process.env.GATSBY_GRAPHQL_ENDPOINT || 'https://app-api.phala.network/'
)

export const subsquidClient = new GraphQLClient(
  process.env.GATSBY_GRAPHQL_SUBSQUID_ENDPOINT ||
    'https://squid.subsquid.io/phala-mining/v/v3/graphql'
)
