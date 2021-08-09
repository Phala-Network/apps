import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { TransactionInfo } from '../../../types/normal'
import { InputDataStepResult } from '../InputDataStep'

interface useTransactionInfoReturn {
  transactionInfo: TransactionInfo
  setTransactionInfo: Dispatch<SetStateAction<TransactionInfo>>
  setHash(hash: string): void
}

export default function useTransactionInfo(
  data?: InputDataStepResult
): useTransactionInfoReturn {
  const [transactionInfo, setTransactionInfo] = useState<TransactionInfo>({
    to: {
      amount: 0,
      address: '',
      network: '',
      type: '',
    },
    from: {
      amount: 0,
      address: '',
      network: '',
      type: '',
    },
    hash: '',
  })

  useEffect(() => {
    const { from, to, amount: amountFromPrevStep } = data || {}

    setTransactionInfo({
      to: {
        amount: amountFromPrevStep?.toNumber() || 0,
        address: to?.account || '',
        network: to?.network || '',
        type: to?.type || '',
      },
      from: {
        amount: amountFromPrevStep?.toNumber() || 0,
        address: from?.account || '',
        network: from?.network || '',
        type: from?.type || '',
      },
    })
  }, [data])

  const setHash = (hash: string) => {
    setTransactionInfo({ ...transactionInfo, hash })
  }

  return { transactionInfo, setTransactionInfo, setHash }
}
