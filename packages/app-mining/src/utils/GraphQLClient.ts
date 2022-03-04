import {GraphQLClient} from 'graphql-request'

export const client = new GraphQLClient(
  process.env.GATSBY_GRAPHQL_ENDPOINT || 'http://localhost:3001'
)
