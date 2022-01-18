import {GraphQLClient} from 'graphql-request'

export const client = new GraphQLClient(
  // Remove it when merge into master
  'https://app-api-staging.phala.network'
  // process.env.GATSBY_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql'
)
