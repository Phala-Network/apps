import {GraphQLClient} from 'graphql-request'

export const client = new GraphQLClient(
  process.env.GATSBY_GRAPHQL_ENDPOINT || 'https://app-api.phala.network/'
)
