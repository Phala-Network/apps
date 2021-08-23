import { TransactionInfo, TransactionRecord } from '@phala/app-types'
import { useBridgePhalaRecordInfo } from '@phala/react-libs'
import React, { useMemo } from 'react'
import { Alert, Spacer } from '../..'
import BaseInfo from '../../bridge/SubmitStep/BaseInfo'
import { EthereumProgress } from '../EthereumProgress'

type Props = {
  transactionInfo: TransactionInfo
  record: TransactionRecord
}

const ResultStepToKhala: React.FC<Props> = (props) => {
  const { transactionInfo, record } = props
  const { transaction } = record
  const { events, proposal } = useBridgePhalaRecordInfo(record)
  const progressIndex = useMemo(() => {
    if (events?.execution !== undefined) {
      return 4
    }

    if (
      events?.approval !== undefined ||
      proposal?.unwrapOr(undefined)?.status?.isApproved === true
    ) {
      return 3
    }

    return 2
  }, [events, proposal])

  return (
    <>
      <BaseInfo layout={'block'} data={transactionInfo} />

      <Spacer></Spacer>

      <Alert>
        <EthereumProgress
          transactionHash={transaction}
          progressIndex={progressIndex}
        />
      </Alert>
    </>
  )
}

export default ResultStepToKhala
