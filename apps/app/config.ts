import {GraphQLClient} from 'graphql-request'
import {mainnet} from 'viem/chains'

export const PHALA_ENDPOINTS = [
  'wss://phala-rpc.dwellir.com',
  'wss://api.phala.network/ws',
  'wss://phala.api.onfinality.io/public-ws',
]
export const subsquidClient = new GraphQLClient(
  'https://subsquid.phala.network/phala-computation/graphql',
)

export const WPHA_ASSET_ID = 10000

export const ethChain = mainnet

export const PHA_CONTRACT_ADDRESS = '0x6c5bA91642F10282b576d91922Ae6448C9d52f4E'
export const VAULT_CONTRACT_ADDRESS =
  '0x21d6eC8fc14CaAcc55aFA23cBa66798DAB3a0ec0'
export const KHALA_CLAIMER_CONTRACT_ADDRESS =
  '0xa139F849000C5438855032eBFeed9Ee104023a73'
