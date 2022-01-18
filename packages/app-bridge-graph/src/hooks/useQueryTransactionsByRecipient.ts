import {gql} from 'graphql-request'
import {useRequest} from './useRequest'

/**
 * @deprecated
 * @param recipient
 * @returns
 */
export function useQueryTransactionsByRecipient(recipient = '') {
  return useRequest(gql`
    {
      chainBridgeFungibleTransferEvents(
        first: 50
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
