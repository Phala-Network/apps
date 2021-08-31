import {TransactionInfo, TransactionRecord} from '@phala/app-types'
import React from 'react'
import {Alert, Spacer} from '../..'
import BaseInfo from '../../bridge/SubmitStep/BaseInfo'
import {EthereumProgress} from '../EthereumProgress'

type Props = {
  transactionInfo: TransactionInfo
  record: TransactionRecord
}

const ResultStepToKhala: React.FC<Props> = (props) => {
  const {transactionInfo, record} = props
  const {transaction} = record

  return (
    <>
      <BaseInfo layout={'block'} data={transactionInfo} />

      <Spacer></Spacer>

      <Alert>
        <EthereumProgress transactionHash={transaction} />
      </Alert>
    </>
  )
}

export default ResultStepToKhala
