import {atom, useAtom} from 'jotai'

const fromAddress = atom<string>('')
const fromAmount = atom<number>(0)
const toAddress = atom<string>('')

export const useFromAddress = () => useAtom(fromAddress)
export const useFromAmount = () => useAtom(fromAmount)
export const useToAddress = () => useAtom(toAddress)
