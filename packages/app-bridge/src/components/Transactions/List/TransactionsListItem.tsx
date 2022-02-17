import {useBridgePhalaRecordInfo} from '@phala/react-libs'
import React, {useMemo} from 'react'
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
  const {sender, recipient, destChainId} = record
  const {events, convertedAmount} = useBridgePhalaRecordInfo(record)

  const status = useMemo(() => {
    if (events?.execution !== undefined) {
      return 'executed'
    }

    return 'pending'
  }, [events])

  if (!record) return null

  let fromNetwork = ''
  let toNetwork = ''

  if (destChainId === 1) {
    fromNetwork = 'Khala'
    toNetwork = 'Ethereum'
  } else {
    fromNetwork = 'Ethereum'
    toNetwork = 'Khala'
  }

  return (
    <>
      <ItemRoot>
        <TransactionStatus status={status} />

        <ItemInfoBlock
          network={fromNetwork}
          amount={convertedAmount || ''}
          address={sender || ''}
        ></ItemInfoBlock>

        <ArrowIcon />

        <ItemInfoBlock
          network={toNetwork}
          amount={convertedAmount || ''}
          address={recipient}
        ></ItemInfoBlock>

        <JumpIcon />
      </ItemRoot>

      {/* <ResultStepModal
        record={record}
        transactionInfo={{
          from: {
            address: depositor || '',
            amount: parseFloat(convertedAmount),
            type: 'PHA',
            network: 'Ethereum',
          },
          to: {
            address: recipient,
            amount: parseFloat(convertedAmount),
            type: 'PHA',
            network: 'Khala',
          },
          hash,
        }}
        onClose={onSubmit}
        visible={modalVisible}
      /> */}
    </>
  )
}

export default TransactionsListItem
