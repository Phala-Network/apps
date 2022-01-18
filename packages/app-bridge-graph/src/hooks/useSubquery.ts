import {default as graphqlRequest, gql} from 'graphql-request'

export function useSubquery() {
  return graphqlRequest(
    'https://api.subquery.network/sq/Phala-Network/khala-chainbridge__UGhhb',
    gql`
      query {
        bridgeInboundingRecords(first: 5) {
          nodes {
            id
            createdAt
            originChainId
            depositNonce
          }
        }
        bridgeOutboundingRecords(first: 5) {
          nodes {
            id
            createdAt
            destChainId
            depositNonce
          }
        }
      }
    `
  )
}
