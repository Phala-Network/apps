import { TransactionRecords } from '@phala/app-types'
import { down } from 'styled-breakpoints'
import styled from 'styled-components'
import scrollbar from './scrollbar'
import TransactionsListItem from './TransactionsListItem'

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

const TransactionsList: React.FC<Props> = (props) => {
  const { records } = props

  return (
    <TransactionsListRoot>
      {records.map((record, index) => {
        return <TransactionsListItem record={record} key={index} />
      })}
    </TransactionsListRoot>
  )
}

export default TransactionsList
