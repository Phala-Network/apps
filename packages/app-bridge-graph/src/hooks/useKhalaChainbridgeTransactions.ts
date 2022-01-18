import {default as graphqlRequest, gql} from 'graphql-request'

export function useKhalaChainbridgeTransactions() {
  return graphqlRequest(
    'https://api.thegraph.com/subgraphs/name/tolak/khala-rinkeby-chainbridge',
    gql`
      {
        txes(first: 5) {
          id
          hash
          sender
        }
        bridgeOutboundingRecords(first: 5) {
          id
          createdAt
          destChainId
          depositNonce
        }
      }
    `
  )
}
