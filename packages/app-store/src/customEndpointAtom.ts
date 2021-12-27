import {atom, useAtom} from 'jotai'

export const customEndpointAtom = atom<string>(
  'wss://khala-api.phala.network/ws'
)

export function useCustomEndpointAtom() {
  return useAtom(customEndpointAtom)
}
