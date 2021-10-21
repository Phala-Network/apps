import {TransactionInfo, TransactionRecord} from '@phala/app-types'
import React from 'react'
import {Alert, Spacer} from '../..'
import BaseInfo from '../../bridge/SubmitStep/BaseInfo'
import {KhalaProcess} from '../KhalaProcess'

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

      <Alert>
        <KhalaProcess
          khalaAddress={transactionInfo.from.address}
          etherscanAddress={transactionInfo.to.address}
          progressIndex={3}
        />
      </Alert>
    </>
  )
}

export default ResultStepToEthereum
