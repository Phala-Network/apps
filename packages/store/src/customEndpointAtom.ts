import {useAtom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'

export const customEndpointAtom = atomWithStorage<string>(
  'jotai:custom_endpoint',
  'wss://khala-api.phala.network/ws'
)

export function useCustomEndpointAtom() {
  return useAtom(customEndpointAtom)
}
