import {useAtom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'

type TransactionInfoItem = {
  address: string
  amount: number
  network: string
  type: string
}

type TransactionInfo = {
  from: TransactionInfoItem
  to: TransactionInfoItem
  hash?: string
}

export const transactionsInfoAtom = atomWithStorage<TransactionInfo[]>(
  'jotai:transactionsInfo',
  []
)

export const useTransactionsInfoAtom = () => useAtom(transactionsInfoAtom)
