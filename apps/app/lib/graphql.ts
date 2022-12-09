import {GraphQLClient} from 'graphql-request'
import {getSdk} from './subsquidSdk'

export const subsquidClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_SUBSQUID_URL ??
    'https://squid.subsquid.io/phala-stake-pool-v2/v/pc4/graphql'
)
export const subsquidSdk = getSdk(subsquidClient)
