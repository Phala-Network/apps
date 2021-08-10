import { atomWithStorage } from 'jotai/utils'
import { Account } from '../types/normal'

const polkadotAccountAtom = atomWithStorage<Account | undefined>(
  'polkadotAccount',
  undefined
)

export default polkadotAccountAtom
