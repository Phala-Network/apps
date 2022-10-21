import {GraphQLClient} from 'graphql-request'

export const subsquidClient = new GraphQLClient(
  process.env.GATSBY_GRAPHQL_SUBSQUID_ENDPOINT ||
    'https://squid.subsquid.io/phala-mining/v/v1/graphql'
)
