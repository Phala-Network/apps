import {clickEvent} from '@phala/app-data-analytics'
import {TransactionRecord} from '@phala/app-types'
import {ResultStepModal} from '@phala/react-components'
import React, {useState} from 'react'
import styled from 'styled-components'
import ArrowIcon from './ArrowIcon'
import ItemInfoBlock from './ItemInfoBlock'
import JumpIcon from './JumpIcon'
import Status from './Status'

export type TransactionsListItemFromPolkadotProps = {
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

const Component: React.FC<TransactionsListItemFromPolkadotProps> = (props) => {
  const {record} = props
  const {depositor} = record
  const [modalVisible, setModalVisible] = useState(false)
  const convertedAmount = '1000'
  const destinationRecipient = '9sdifosduhfosdhfosduhf'
  const hash = 's;fjhsdlkjfh'
  // const {events, hash, convertedAmount, destinationRecipient} =
  //   useBridgePhalaRecordInfo(record)

  // const status = useMemo(() => {
  //   if (events?.execution !== undefined) {
  //     return 'executed'
  //   }

  //   return 'pending'
  // }, [events])

  if (!record) return null

  const onSubmit = () => {
    setModalVisible(false)
  }

  const openModal = () => {
    setModalVisible(true)
    clickEvent('open transaction detail modal')
  }

  return (
    <>
      <ItemRoot onClick={openModal}>
        <Status status={'pending'} />

        <ItemInfoBlock
          network="Khala"
          amount={convertedAmount || ''}
          address={depositor || ''}
        />

        <ArrowIcon />

        <ItemInfoBlock
          network="Ethereum"
          amount={convertedAmount || ''}
          address={destinationRecipient}
        />

        <JumpIcon />

        <Line />
      </ItemRoot>

      <ResultStepModal
        record={record}
        transactionInfo={{
          from: {
            address: depositor || '',
            amount: parseFloat(convertedAmount),
            type: 'PHA',
            network: 'Khala',
          },
          to: {
            address: destinationRecipient,
            amount: parseFloat(convertedAmount),
            type: 'PHA',
            network: 'Ethereum',
          },
          hash,
        }}
        onClose={onSubmit}
        visible={modalVisible}
      />
    </>
  )
}

export const TransactionsListItemFromPolkadot = Component
