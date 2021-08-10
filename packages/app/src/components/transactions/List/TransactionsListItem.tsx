import React, { useState } from 'react'
import styled from 'styled-components'
import { TransactionInfo } from '../../../types/normal'
import ResultStepModal from '../../bridge/ResultStep/ResultStepModal'
import ArrowIcon from './ArrowIcon'
import ItemInfoBlock from './ItemInfoBlock'
import JumpIcon from './JumpIcon'
import Status from './Status'

export type TransactionsListItemProps = {
  status: string
  transactionInfo: TransactionInfo
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
  const { status, transactionInfo } = props
  const [modalVisible, setModalVisible] = useState(false)

  const onSubmit = () => {
    setModalVisible(false)
  }

  if (!transactionInfo) return null

  return (
    <>
      <ItemRoot onClick={() => setModalVisible(true)}>
        <Status status={status} />

        <ItemInfoBlock {...transactionInfo.from}></ItemInfoBlock>

        <ArrowIcon />

        <ItemInfoBlock {...transactionInfo.to}></ItemInfoBlock>

        <JumpIcon />

        <Line />
      </ItemRoot>

      <ResultStepModal
        transactionInfo={transactionInfo}
        onClose={onSubmit}
        visible={modalVisible}
      />
    </>
  )
}

export default TransactionsListItem
