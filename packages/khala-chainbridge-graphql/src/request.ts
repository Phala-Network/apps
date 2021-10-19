import {default as graphqlRequest} from 'graphql-request'
import {RequestDocument} from 'graphql-request/dist/types'

export function request(document: RequestDocument) {
  return graphqlRequest(
    'https://api.subquery.network/sq/jasl/khala-chainbridge',
    document
  )
}
