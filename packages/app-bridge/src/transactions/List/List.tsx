import {TransactionRecord, TransactionRecords} from '@phala/app-types'
import {createElement} from 'react'
import {down} from 'styled-breakpoints'
import styled from 'styled-components'
import TransactionsListItem from './ListItem/TransactionsListItem'
import {TransactionsListItemFromPolkadot} from './ListItem/TransactionsListItemFromPolkadot'
import scrollbar from './scrollbar'

type Props = {
  records: TransactionRecords
}

const TransactionsListRoot = styled.div`
  ${scrollbar}
  margin-top: 6px;
  margin-right: 16px;
  height: 136px;
  overflow-y: auto;
  opacity: 0;
  animation: 0.35s linear 0.15s opacity both;

  ${down('sm')} {
    margin-right: 0;
  }

  @keyframes opacity {
    to {
      opacity: 1;
    }
  }
`

export const TransactionsList: React.FC<Props> = (props) => {
  const {records = []} = props

  const items = records.map((record: TransactionRecord) => {
    const component =
      record.type === 'fromKhalaToEth'
        ? TransactionsListItemFromPolkadot
        : TransactionsListItem

    return createElement(component, {
      key: record.hash,
      record,
    })
  })

  return <TransactionsListRoot>{items}</TransactionsListRoot>
}
