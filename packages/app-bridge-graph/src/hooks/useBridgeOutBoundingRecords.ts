import {default as graphqlRequest, gql} from 'graphql-request'
import {DateTime} from 'luxon'
import {useEffect, useState} from 'react'

export function useBridgeOutBoundingRecords() {
  const [data, setData] = useState<any>([])
  const [data2, setData2] = useState<any>([])
  const [result, setResult] = useState<any>()

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

      const temp = bridgeOutboundingRecords.map((item: any) => {
        const datetime = DateTime.fromSeconds(parseInt(item.createdAt))

        return {
          ...item,
          datetime,
        }
      })

      setData(temp)
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

      const temp = nodes.map((item: any) => {
        const datetime = DateTime.fromISO(item.createdAt)

        return {
          ...item,
          datetime,
        }
      })

      setData2(temp)
    })
  }, [])

  useEffect(() => {
    const result = [...data, ...data2].sort((a: any, b: any) => {
      return a.datetime.toMillis() - b.datetime.toMillis()
    })
    setResult(result)
  }, [data, data2])

  return result
}
