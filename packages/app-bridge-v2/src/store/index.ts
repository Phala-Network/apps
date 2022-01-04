import {atom, useAtom} from 'jotai'

const fromAddress = atom<string>('')

export function useFromAddress() {
  return useAtom(fromAddress)
}

const fromAmount = atom<number>(0)

export function useFromAmount() {
  return useAtom(fromAmount)
}
