import { GraphQLClient } from 'graphql-request'
import { useMemo } from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import { v4 as uuidv4 } from 'uuid'
import { ChainBridgeProposalApproval, ChainBridgeProposalExecution, getSdk } from '../interfaces/graph'

const ProposalEventsByDepositNonceQueryKey = uuidv4()

export const useProposalEventsByDepositNonceQuery = (
    originChainId?: number,
    depositNonce?: string,
    client?: GraphQLClient
): UseQueryResult<{
    approval: ChainBridgeProposalApproval
    execution: ChainBridgeProposalExecution
}> => {
    const sdk = useMemo(() => (client !== undefined ? getSdk(client) : undefined), [client])

    return useQuery(
        [ProposalEventsByDepositNonceQueryKey, originChainId, depositNonce, client],
        async () => {
            if (client === undefined || depositNonce === undefined || originChainId === undefined) {
                return
            }

            const result = await sdk?.getChainBridgeProposalEventsByDepositNonce({ depositNonce, originChainId })
            return {
                approval: result?.chainBridgeProposalApprovals?.nodes?.[0],
                execution: result?.chainBridgeProposalExecutions?.nodes?.[0],
            }
        },
        {
            enabled: client !== undefined && depositNonce !== undefined && originChainId !== undefined,
        }
    )
}
