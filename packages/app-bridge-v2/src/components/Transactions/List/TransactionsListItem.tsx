import {ResultStepModal} from '@phala/react-components'
import {useBridgePhalaRecordInfo} from '@phala/react-libs'
import React, {useMemo, useState} from 'react'
import styled from 'styled-components'
import {ArrowIcon} from './ArrowIcon'
import {ItemInfoBlock} from './ItemInfoBlock'
import {JumpIcon} from './JumpIcon'
import {TransactionStatus} from './TransactionStatus'

export type TransactionsListItemProps = {
  record: any
}

const ItemRoot = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 12px;
  text-decoration: none;
  cursor: pointer;
  border-bottom: 1px solid #ffffff83;

  &:hover {
    text-decoration: underline;
  }
`

const TransactionsListItem: React.FC<TransactionsListItemProps> = (props) => {
  const {record} = props
  const {depositor} = record
  const [modalVisible, setModalVisible] = useState(false)
  const {events, hash, convertedAmount, destinationRecipient} =
    useBridgePhalaRecordInfo(record)

  const status = useMemo(() => {
    if (events?.execution !== undefined) {
      return 'executed'
    }

    return 'pending'
  }, [events])

  if (!record) return null

  const onSubmit = () => {
    setModalVisible(false)
  }

  const openModal = () => {
    setModalVisible(true)
  }

  return (
    <>
      <ItemRoot onClick={openModal}>
        <TransactionStatus status={status} />

        <ItemInfoBlock
          network="Ethereum"
          amount={convertedAmount || ''}
          address={depositor || ''}
        ></ItemInfoBlock>

        <ArrowIcon />

        <ItemInfoBlock
          network="Khala"
          amount={convertedAmount || ''}
          address={destinationRecipient}
        ></ItemInfoBlock>

        <JumpIcon />
      </ItemRoot>

      <ResultStepModal
        record={record}
        transactionInfo={{
          from: {
            address: depositor || '',
            amount: parseFloat(convertedAmount),
            type: 'PHA',
            network: 'Ethereum',
          },
          to: {
            address: destinationRecipient,
            amount: parseFloat(convertedAmount),
            type: 'PHA',
            network: 'Khala',
          },
          hash,
        }}
        onClose={onSubmit}
        visible={modalVisible}
      />
    </>
  )
}

export default TransactionsListItem
