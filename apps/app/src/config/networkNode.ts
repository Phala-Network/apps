export type NetworkNodeId =
  | 'phala-rewards-demo'
  | 'khala-via-phala'
  | 'khala-via-onfinality'
  | 'pc-test-3'
export type NetworkNode = {id: NetworkNodeId; name: string; address: string}

export const NETWORK_NODES: readonly NetworkNode[] = [
  {
    id: 'khala-via-phala',
    name: 'Khala via Phala',
    address: 'wss://khala-api.phala.network/ws',
  },
  {
    id: 'phala-rewards-demo',
    name: 'Phala',
    address: 'wss://api.phala.network/ws',
  },
  {
    id: 'khala-via-onfinality',
    name: 'Khala via Onfinality',
    address: 'wss://khala.api.onfinality.io/public-ws',
  },
  (process.env.NODE_ENV === 'development' ||
    process.env.CONTEXT === 'deploy-preview' ||
    process.env.CONTEXT === 'branch-deploy') && {
    id: 'pc-test-3',
    name: 'pc-test-3',
    address: 'wss://pc-test-3.phala.network/khala/ws',
  },
].filter((node): node is NetworkNode => node !== false)
