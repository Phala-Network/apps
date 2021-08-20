import { TransactionRecord } from '@phala/app-types'
import { useProposalEventsByDepositNonceQuery } from '@phala/react-graph-chainbridge'
import {
  balanceToDecimal,
  useBridgeProposalQuery,
  useDecimalMultiplier,
  useSubstrateGraphQL,
} from '@phala/react-libs'
import { BN, hexToU8a } from '@polkadot/util'
import { encodeAddress } from '@polkadot/util-crypto'
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import ArrowIcon from './ArrowIcon'
import ItemInfoBlock from './ItemInfoBlock'
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
  const { amount, destinationRecipient, nonce, resourceId, depositor } = record
  const { client } = useSubstrateGraphQL()
  const { multiplier } = useDecimalMultiplier()

  const { data: events } = useProposalEventsByDepositNonceQuery(
    0,
    nonce,
    client
  )
  const [, setModalVisible] = useState(false)
  const parsedNonce = parseInt(nonce)

  const recipient = useMemo(() => {
    try {
      return encodeAddress(hexToU8a(destinationRecipient))
    } catch {
      return undefined
    }
  }, [destinationRecipient])

  const { data: proposal } = useBridgeProposalQuery({
    amount: new BN(amount),
    depositNonce: parsedNonce,
    originChainId: 0,
    recipient,
    resourceId,
  })

  // const onSubmit = () => {
  //   setModalVisible(false)
  // }

  const status = useMemo(() => {
    if (events?.execution !== undefined) {
      return 'executed'
    }

    return 'pending'
  }, [events, proposal])

  const convertedAmount = useMemo(
    () =>
      multiplier !== undefined &&
      balanceToDecimal(new BN(amount), multiplier).toString(),
    [amount, multiplier]
  )

  if (!record) return null

  return (
    <>
      <ItemRoot onClick={() => setModalVisible(true)}>
        <Status status={status} />

        <ItemInfoBlock
          network="eth"
          amount={convertedAmount || ''}
          address={depositor || ''}></ItemInfoBlock>

        <ArrowIcon />

        <ItemInfoBlock
          network="pol"
          amount={convertedAmount || ''}
          address={destinationRecipient}></ItemInfoBlock>

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
