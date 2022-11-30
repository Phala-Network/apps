import {GraphQLClient} from 'graphql-request'
import {getSdk} from './subsquidSdk'

export const subsquidClient = new GraphQLClient('http://localhost:4350/graphql')
export const subsquidSdk = getSdk(subsquidClient)
