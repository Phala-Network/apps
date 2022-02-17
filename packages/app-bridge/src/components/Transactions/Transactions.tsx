import {useBridgeOutBoundingRecords} from '@phala/app-bridge-graph'
import {FloatModal} from '@phala/react-components'
import React from 'react'
import {TransactionsList} from './List/TransactionsList'

export const Transactions: React.FC = () => {
  const records = useBridgeOutBoundingRecords()

  // NOTE: for test purposes
  // const depositor = '0x766d4b6fd707c45518eb49878142a88378a7443c'
  // const depositor = '0x775946638c9341a48ccf65e46b73367d0aba2616'

  // console.error('data2', records)

  if (records?.length === 0) {
    return null
  }

  return (
    <FloatModal title="Transactions Panel">
      <TransactionsList records={records} />
    </FloatModal>
  )
}
