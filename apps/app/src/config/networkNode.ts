import {khala} from '@phala/typedefs'
import {RegistryTypes} from '@polkadot/types/types'

export type NetworkNodeId =
  | 'phala-rewards-demo'
  | 'khala-via-phala'
  | 'khala-via-onfinality'
  | 'pc-test-3'
export type NetworkNode = {
  id: NetworkNodeId
  name: string
  endpoint: string
  types: RegistryTypes
}

export const NETWORK_NODES: readonly NetworkNode[] = [
  {
    id: 'khala-via-phala',
    name: 'Khala via Phala',
    endpoint: 'wss://khala-api.phala.network/ws',
    types: khala,
  },
  {
    id: 'phala-rewards-demo',
    name: 'Phala',
    endpoint: 'wss://api.phala.network/ws',
    types: khala,
  },
  {
    id: 'khala-via-onfinality',
    name: 'Khala via Onfinality',
    endpoint: 'wss://khala.api.onfinality.io/public-ws',
    types: khala,
  },
  (process.env.NODE_ENV === 'development' ||
    process.env.CONTEXT === 'deploy-preview' ||
    process.env.CONTEXT === 'branch-deploy') &&
    ({
      id: 'pc-test-3',
      name: 'pc-test-3',
      endpoint: 'wss://pc-test-3.phala.network/khala/ws',
      types: khala,
    } as NetworkNode),
].filter((node): node is NetworkNode => node !== false)
