import {atom, useAtom} from 'jotai'

type Account = {name?: string; address: string}

export const ethereumAccountAtom = atom<Account | undefined>(undefined)

export function useEthereumAccountAtom() {
  return useAtom(ethereumAccountAtom)
}
