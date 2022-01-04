import {atom, useAtom} from 'jotai'

const fromAddress = atom<string>('')

export function useFromAddress() {
  return useAtom(fromAddress)
}
