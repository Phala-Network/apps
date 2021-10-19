import {gql, request} from 'graphql-request'
import {queryTransactionsByRecipient} from './queryTransactionsByRecipient'

export const khalaChainbridgeGraphql = {}

export const khalaChainbridgeGraphqlQuery = {
  queryTransactionsByRecipient,
}

export function khalaChainbridgeGraphqlQuery2() {
  const query = gql`
    {
      chainBridgeFungibleTransferEvents(
        first: 5
        filter: {
          recipient: {equalTo: "0xb7687a5a3e7b49522705833bf7d5baf18aabdd2d"}
        }
      ) {
        totalCount
        nodes {
          amount
          recipient
          signer
          depositNonce
          destinationChainId
          executedAt
          id
        }
      }
    }
  `

  request('https://api.subquery.network/sq/jasl/khala-chainbridge', query).then(
    (data) => console.error(data)
  )
}
