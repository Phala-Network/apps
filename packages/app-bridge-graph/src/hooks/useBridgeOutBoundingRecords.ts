import {default as graphqlRequest, gql} from 'graphql-request'
import {useEffect, useState} from 'react'

export function useBridgeOutBoundingRecords() {
  const [data, setData] = useState<any>()
  const [data2, setData2] = useState<any>()

  useEffect(() => {
    graphqlRequest(
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
    ).then(setData)

    graphqlRequest(
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
    ).then(setData2)
  }, [])

  return [data, data2]
}
