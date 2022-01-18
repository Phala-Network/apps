import {default as graphqlRequest, gql} from 'graphql-request'

export function useKhalaChainbridgeTransactions() {
  return graphqlRequest(
    'https://gateway.thegraph.com/api/cfd0e529ce4d511c6ec482c97faafa99/subgraphs/id/0x7dc6f99be5cf16d605bedf237771413aaa3021b1-0',
    gql`
      {
        depositRecords(first: 5, where: {destinationChainId: 0}) {
          id
          transaction
          amount
          depositor
          destinationChainId
          nonce
        }
        proposalPasseds(first: 5) {
          id
          depositNonce
          originChainId
          resourceId
        }
      }
    `
  )
}
