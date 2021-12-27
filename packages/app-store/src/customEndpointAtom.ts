import {atom, useAtom} from 'jotai'

export const customEndpointAtom = atom<string>('')

export function useCustomEndpointAtom() {
  return useAtom(customEndpointAtom)
}
