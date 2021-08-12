import { Account } from '@phala/app-types'
import { atomWithStorage } from 'jotai/utils'

export const polkadotAccountAtom = atomWithStorage<Account | undefined>(
  'polkadotAccount',
  undefined
)
