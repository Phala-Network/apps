import {useAtom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'

export const customEndpointAtom = atomWithStorage<string>(
  'customEndpoint',
  'wss://khala-api.phala.network/ws'
)

export function useCustomEndpointAtom() {
  return useAtom(customEndpointAtom)
}
