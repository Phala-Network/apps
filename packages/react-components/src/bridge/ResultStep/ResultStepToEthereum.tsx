import {TransactionInfo, TransactionRecord} from '@phala/app-types'
import React from 'react'
import {Alert, Spacer} from '../..'
import BaseInfo from '../../bridge/SubmitStep/BaseInfo'

type Props = {
  transactionInfo: TransactionInfo
  record: TransactionRecord
}

const ResultStepToEthereum: React.FC<Props> = (props) => {
  const {transactionInfo} = props
  // const {transaction} = record

  // console.log('transaction', transaction)

  return (
    <>
      <BaseInfo layout={'block'} data={transactionInfo} />

      <Spacer></Spacer>

      <Alert></Alert>
    </>
  )
}

export default ResultStepToEthereum
