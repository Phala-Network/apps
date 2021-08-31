import {TransactionInfo} from '@phala/app-types'
import {useAtom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'

export const transactionsInfoAtom = atomWithStorage<TransactionInfo[]>(
  'transactionsInfo',
  []
)

export const useTransactionsInfoAtom = () => useAtom(transactionsInfoAtom)
