import {gql} from 'graphql-request'
import {useRequest} from './useRequest'

export function useQueryTransactionsBySigner(signer = '') {
  return useRequest(gql`
    {
      chainBridgeFungibleTransferEvents(
        first: 50
        filter: {
          signer: {equalTo: "${signer}"}
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
