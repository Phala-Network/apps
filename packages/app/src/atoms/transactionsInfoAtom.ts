import { atomWithStorage } from 'jotai/utils'
import { TransactionInfo } from '../types/normal'

const transactionsInfoAtom = atomWithStorage<TransactionInfo[]>(
  'transactionsInfo',
  []
)

export default transactionsInfoAtom
