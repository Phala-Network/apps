import { TransactionInfo } from '@phala/app-types'
import { atomWithStorage } from 'jotai/utils'

export const transactionsInfoAtom = atomWithStorage<TransactionInfo[]>(
  'transactionsInfo',
  []
)
