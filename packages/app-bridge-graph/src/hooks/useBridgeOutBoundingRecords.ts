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
          bridgeOutboundingRecords(first: 10) {
            id
            createdAt
            destChainId
            depositNonce
            resourceId
            amount
            recipient
            sendTx
            sender
          }
        }
      `
    ).then((data) => {
      const {bridgeOutboundingRecords} = data

      setData(bridgeOutboundingRecords)
    })

    graphqlRequest(
      'https://api.subquery.network/sq/Phala-Network/khala-chainbridge__UGhhb',
      gql`
        query {
          bridgeOutboundingRecords(first: 10) {
            nodes {
              id
              createdAt
              destChainId
              depositNonce
              resourceId
              amount
              recipient
              sendTx
              sender
            }
          }
        }
      `
    ).then((data) => {
      const {nodes} = data.bridgeOutboundingRecords

      setData2(nodes)
    })
  }, [])

  return [data, data2]
}
