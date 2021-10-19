import {gql} from 'graphql-request'
import {useRequest} from './useRequest'

export function useQueryTransactionsByRecipient(recipient: string) {
  return useRequest(gql`
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
