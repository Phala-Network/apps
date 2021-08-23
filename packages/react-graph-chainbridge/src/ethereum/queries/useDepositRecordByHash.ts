import { GraphQLClient } from 'graphql-request'
import { useMemo } from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import { v4 as uuidv4 } from 'uuid'
import { GetDepositRecordByHashQuery, getSdk } from '../interfaces'

const key = uuidv4()

export const useDepositRecordByHash = (
  hash?: string,
  client?: GraphQLClient
): UseQueryResult<GetDepositRecordByHashQuery> => {
  const sdk = useMemo(
    () => (client !== undefined ? getSdk(client) : undefined),
    [client]
  )

  return useQuery(
    [key, hash, client],
    async () => await sdk?.getDepositRecordByHash({ hash }),
    {
      enabled: hash !== undefined,
    }
  )
}
