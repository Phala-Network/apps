import {Account} from '@phala/app-types'
import {atom, useAtom} from 'jotai'

export const ethereumAccountAtom = atom<Account | undefined>(undefined)

export function useEthereumAccountAtom() {
  return useAtom(ethereumAccountAtom)
}
