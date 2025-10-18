import {atomWithStorage} from 'jotai/utils'

export const selectedEndpointAtom = atomWithStorage<string>(
  'jotai:phala_selected_endpoint',
  'wss://phala-rpc.n.dwellir.com',
)
