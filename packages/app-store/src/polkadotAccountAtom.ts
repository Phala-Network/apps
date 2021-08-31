import {Account} from '@phala/app-types'
import {useAtom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'

export const polkadotAccountAtom = atomWithStorage<Account | undefined>(
  'polkadotAccount',
  undefined
)

export const usePolkadotAccountAtom = () => useAtom(polkadotAccountAtom)
