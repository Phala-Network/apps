import { TransactionInfo, TransactionRecord } from '@phala/app-types'
import { useBridgePhalaRecordInfo } from '@phala/react-libs'
import { isDev, isTest } from '@phala/utils'
import React, { useMemo } from 'react'
import { Alert, Spacer } from '../..'
import BaseInfo from '../../bridge/SubmitStep/BaseInfo'
import Progress from '../Progress'

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

  let link = ''

  if (transaction) {
    if (isTest() || isDev()) {
      link = `https://kovan.etherscan.io/tx/${transaction}`
    } else {
      link = `https://etherscan.io/tx/${transaction}`
    }
  }

  const steps = [
    {
      text: 'Transaction Send',
    },
    {
      text: 'Ethereum Confirmed',
      link,
    },
    {
      text: 'Relayer Confirmed',
    },
    {
      text: 'Khala Confirmed',
    },
  ]

  return (
    <>
      <BaseInfo layout={'block'} data={transactionInfo} />

      <Spacer></Spacer>

      <Alert>
        <Progress steps={steps} progressIndex={progressIndex}></Progress>
      </Alert>
    </>
  )
}

export default ResultStepToKhala
