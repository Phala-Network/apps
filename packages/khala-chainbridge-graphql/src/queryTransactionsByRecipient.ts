import {gql} from 'graphql-request'
import {request} from './request'

export function queryTransactionsByRecipient(recipient: string) {
  return request(gql`
    {
      chainBridgeFungibleTransferEvents(
        first: 5
        filter: {
          recipient: {equalTo: "${recipient}"}
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
  `)
}
