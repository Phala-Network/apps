import {atom, useAtom} from 'jotai'
import {atomWithStorage} from 'jotai/utils'
import {
  NetworkNode,
  NETWORK_NODES,
  NetworkNodeId,
  DEFAULT_NETWORK_NODE_ID,
} from '../config/networkNode'

const lastNetworkNodeAtom = atomWithStorage<NetworkNodeId | null>(
  'jotai:last_network_node',
  null
)

const currentNetworkNodeAtom = atom<NetworkNode, NetworkNodeId>(
  (get) => {
    const lastNetworkNodeId = get(lastNetworkNodeAtom)
    const networkNode = NETWORK_NODES.find(
      (node) => node.id === lastNetworkNodeId
    )

    return (
      networkNode ??
      (NETWORK_NODES.find(
        (node) => node.id === DEFAULT_NETWORK_NODE_ID
      ) as NetworkNode)
    )
  },
  (get, set, update) => {
    set(lastNetworkNodeAtom, update)
  }
)

export const useCurrentNetworkNode = () => {
  return useAtom(currentNetworkNodeAtom)
}
