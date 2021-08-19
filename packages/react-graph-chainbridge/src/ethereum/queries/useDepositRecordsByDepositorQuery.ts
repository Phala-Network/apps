import { GraphQLClient } from 'graphql-request'
import { useMemo } from 'react'
import { getSdk } from '../interfaces'

export const useDepositRecordsByDepositorQuery = (
  depositor?: string,
  first?: number,
  skip?: number,
  client?: GraphQLClient
) => {
  const sdk = useMemo(
    () => (client !== undefined ? getSdk(client) : undefined),
    [client]
  )

  return sdk?.depositRecordsByDepositor({ depositor, first, skip })
}
