import {useEthereumAccountAtom} from '@phala/app-store'
import {FloatModal} from '@phala/react-components'
import {useDepositRecordsByDepositorQuery} from '@phala/react-graph-chainbridge'
import {useEthereumGraphQL} from '@phala/react-libs'
import React, {useEffect, useState} from 'react'
import {TransactionsList} from './List/TransactionsList'

export const Transactions: React.FC = () => {
  const {client} = useEthereumGraphQL()
  const [records, setRecords] = useState<any>([])
  const [ethereumAccount] = useEthereumAccountAtom()
  const depositor = ethereumAccount?.address || ''

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

      setRecords(transactionRecords)
    }
  }, [data, depositor])

  if (records?.length === 0) {
    return null
  }

  return (
    <FloatModal title="Transactions Panel">
      <TransactionsList records={records} />
    </FloatModal>
  )
}
