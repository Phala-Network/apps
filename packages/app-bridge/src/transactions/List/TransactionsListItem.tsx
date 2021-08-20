import { TransactionRecord } from '@phala/app-types'
import { useProposalEventsByDepositNonceQuery } from '@phala/react-graph-chainbridge'
import {
  useApiPromise,
  useBridgeProposalQuery,
  useSubstrateGraphQL,
} from '@phala/react-libs'
import { BN, hexToU8a } from '@polkadot/util'
import { encodeAddress } from '@polkadot/util-crypto'
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import ArrowIcon from './ArrowIcon'
import JumpIcon from './JumpIcon'
import Status from './Status'

export type TransactionsListItemProps = {
  record: TransactionRecord
}

const ItemRoot = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 12px;
  color: black;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const Line = styled.div`
  position: absolute;
  top: 0;
  left: 40px;
  right: 0;
  height: 1px;
  background-color: black;
`

const TransactionsListItem: React.FC<TransactionsListItemProps> = (props) => {
  const { record } = props
  const { amount, destinationRecipient, nonce, resourceId } = record
  const { client } = useSubstrateGraphQL()

  const { data: events } = useProposalEventsByDepositNonceQuery(
    0,
    nonce,
    client
  )
  const [, setModalVisible] = useState(false)
  const { api } = useApiPromise()

  console.log('api', api)

  console.log('ethereum?.chainBridge.chainId, nonce, client', 0, nonce, client)

  const parsedNonce = parseInt(nonce)

  const recipient = useMemo(() => {
    try {
      return encodeAddress(hexToU8a(destinationRecipient))
    } catch {
      return undefined
    }
  }, [destinationRecipient])

  console.log('recipient', recipient, events)

  const { data: proposal } = useBridgeProposalQuery({
    amount: new BN(amount),
    depositNonce: parsedNonce,
    originChainId: 0,
    recipient,
    resourceId,
  })

  console.log('proposal', proposal)

  // const onSubmit = () => {
  //   setModalVisible(false)
  // }

  if (!record) return null

  return (
    <>
      <ItemRoot onClick={() => setModalVisible(true)}>
        <Status status={status} />

        {/* <ItemInfoBlock {...transactionInfo.from}></ItemInfoBlock> */}

        <ArrowIcon />

        {/* <ItemInfoBlock {...transactionInfo.to}></ItemInfoBlock> */}

        <JumpIcon />

        <Line />
      </ItemRoot>

      {/* <ResultStepModal
        transactionInfo={{}}
        onClose={onSubmit}
        visible={modalVisible}
      /> */}
    </>
  )
}

export default TransactionsListItem
