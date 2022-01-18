import {default as graphqlRequest} from 'graphql-request'
import {RequestDocument} from 'graphql-request/dist/types'

export function useRequest(document: RequestDocument) {
  return graphqlRequest(
    'https://api.thegraph.com/subgraphs/name/tolak/khala-rinkeby-chainbridge',
    document
  )
}
