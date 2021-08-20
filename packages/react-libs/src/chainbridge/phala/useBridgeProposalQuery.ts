import { Option } from '@polkadot/types'
import { AccountId, Balance } from '@polkadot/types/interfaces'
import { hexToU8a } from '@polkadot/util'
import { decodeAddress } from '@polkadot/util-crypto'
import BN from 'bn.js'
import { useQuery, UseQueryResult } from 'react-query'
import { v4 as uuidv4 } from 'uuid'
import { useApiPromise } from '../..'
import { useDecimalMultiplier } from '../../polkadot/useTokenDecimalsQuery'

const BridgeVoteQueryKey = uuidv4()

export const useBridgeProposalQuery = ({
  amount,
  depositNonce,
  recipient,
  resourceId,
  originChainId,
}: {
  amount?: Balance | BN
  depositNonce?: number
  recipient?: AccountId | string
  resourceId?: string
  originChainId?: number
}): UseQueryResult<Option<any>> => {
  const { api } = useApiPromise()
  const { multiplier } = useDecimalMultiplier()

  return useQuery(
    [
      BridgeVoteQueryKey,
      amount,
      depositNonce,
      recipient,
      resourceId,
      multiplier,
      originChainId,
      api === undefined,
    ],
    async () => {
      console.log('check', amount, api, multiplier, originChainId)
      if (
        amount === undefined ||
        api === undefined ||
        multiplier === undefined ||
        originChainId === undefined
      ) {
        return
      }

      const call = api.registry.createType('Call', {
        args: [decodeAddress(recipient), amount, hexToU8a(resourceId, 256)],
        callIndex: api?.tx?.bridgeTransfer?.transfer?.callIndex,
      })

      return await api?.query?.chainBridge?.votes?.(originChainId, [
        depositNonce,
        call,
      ])
    }
  )
}
