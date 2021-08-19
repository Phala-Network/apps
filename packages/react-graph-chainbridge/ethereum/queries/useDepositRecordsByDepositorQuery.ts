import { GraphQLClient } from 'graphql-request'
import { useMemo } from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import { v4 as uuidv4 } from 'uuid'
import { DepositRecordsByDepositorQuery, getSdk } from '../interfaces/graph'

const DepositRecordByDepositorQueryKey = uuidv4()

export const useDepositRecordsByDepositorQuery = (
    depositor?: string,
    first?: number,
    skip?: number,
    client?: GraphQLClient
): UseQueryResult<DepositRecordsByDepositorQuery> => {
    const sdk = useMemo(() => (client !== undefined ? getSdk(client) : undefined), [client])

    return useQuery(
        [DepositRecordByDepositorQueryKey, depositor, client],
        async () => await sdk?.depositRecordsByDepositor({ depositor, first, skip }),
        {
            enabled: depositor !== undefined,
        }
    )
}
