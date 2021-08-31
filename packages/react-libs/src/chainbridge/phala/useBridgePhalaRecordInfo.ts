import {useProposalEventsByDepositNonceQuery} from '@phala/react-graph-chainbridge'
import {BN, hexToU8a} from '@polkadot/util'
import {encodeAddress} from '@polkadot/util-crypto'
import {useMemo} from 'react'
import {
  balanceToDecimal,
  useBridgeProposalQuery,
  useDecimalMultiplier,
  useSubstrateGraphQL,
} from '../..'

export type useBridgePhalaRecordInfoRecord = {
  amount: string
  destinationRecipient: string
  nonce: string
  resourceId: string
}

export const useBridgePhalaRecordInfo = (
  record: useBridgePhalaRecordInfoRecord
) => {
  const {
    amount = '',
    destinationRecipient = '',
    nonce = '',
    resourceId = '',
  } = record ?? {}
  const {client} = useSubstrateGraphQL()
  const {multiplier} = useDecimalMultiplier()
  const {data: events} = useProposalEventsByDepositNonceQuery(0, nonce, client)
  const parsedNonce = parseInt(nonce)

  const recipient = useMemo(() => {
    try {
      return encodeAddress(hexToU8a(destinationRecipient))
    } catch {
      return undefined
    }
  }, [destinationRecipient])

  const {data: proposal} = useBridgeProposalQuery({
    amount: new BN(amount),
    depositNonce: parsedNonce,
    originChainId: 0,
    recipient,
    resourceId,
  })

  const convertedAmount = useMemo(() => {
    if (multiplier !== undefined) {
      return balanceToDecimal(new BN(amount), multiplier).toString()
    } else {
      return '0'
    }
  }, [amount, multiplier])

  const hash = events?.approval?.approvalExtrinsic

  return {
    destinationRecipient,
    events,
    proposal,
    convertedAmount,
    hash,
  }
}
