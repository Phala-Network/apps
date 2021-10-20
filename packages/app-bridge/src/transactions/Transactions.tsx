import {clickEvent} from '@phala/app-data-analytics'
import {useEthereumAccountAtom, usePolkadotAccountAtom} from '@phala/app-store'
import {TransactionRecords} from '@phala/app-types'
import {khalaChainbridgeGraphqlQuery} from '@phala/khala-chainbridge-graphql'
import {FloatModal} from '@phala/react-components'
import {useDepositRecordsByDepositorQuery} from '@phala/react-graph-chainbridge'
import {useEthereumGraphQL} from '@phala/react-libs'
import React, {useEffect, useState} from 'react'
import {useQuery} from 'react-query'
import {TransactionsList} from './List'

const Transactions: React.FC = () => {
  const {client} = useEthereumGraphQL()
  const [records, setRecords] = useState<TransactionRecords>([])
  const [ethereumAccount] = useEthereumAccountAtom()
  const depositor = ethereumAccount?.address || ''
  const [polkadotAccount] = usePolkadotAccountAtom()

  const {data: polkadotData} = useQuery(
    ['useQueryTransactionsBySigner', polkadotAccount?.address],
    () =>
      khalaChainbridgeGraphqlQuery.useQueryTransactionsBySigner(
        '42vfdiXkd3EzyDHCugnogd3hPA3hYBud4NWVv7S5E52Af8fW' ||
          polkadotAccount?.address
      )
  )

  useEffect(() => {
    // amount: "1000000000000"
    // depositNonce: "1"
    // destinationChainId: 0
    // executedAt: "0x4c268135fe67f52a18765aec9a2648ce9a40cf6331c6e8df17573333d466a904"
    // id: "0-1"
    // recipient: "0xb7687a5a3e7b49522705833bf7d5baf18aabdd2d"
    // signer: "42vfdiXkd3EzyDHCugnogd3hPA3hYBud4NWVv7S5E52Af8fW"
    console.error(polkadotData?.chainBridgeFungibleTransferEvents.nodes)
  }, [polkadotData])

  // NOTE: for test purposes
  // const depositor = '0x766d4b6fd707c45518eb49878142a88378a7443c'
  // const depositor = '0x775946638c9341a48ccf65e46b73367d0aba2616'

  const {data} = useDepositRecordsByDepositorQuery(depositor, 10, 0, client)

  useEffect(() => {
    if (data?.depositRecords) {
      const transactionRecords = data?.depositRecords.map((item) => {
        return {
          ...item,
          depositor,
        }
      })

      setRecords([...records, ...transactionRecords])
    }
  }, [data, depositor, records])

  function onActive(active: boolean) {
    clickEvent('transactions float modal', {active})
  }

  if (records?.length === 0) {
    return null
  }

  return (
    <FloatModal title="Transactions Panel" onActive={onActive}>
      {/* 
        <ClearButton onClick={() => setTransactionsInfo([])}>
          Clear
        </ClearButton> 
      */}
      <TransactionsList records={records} />
    </FloatModal>
  )
}

export default Transactions
