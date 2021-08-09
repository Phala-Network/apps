import { down } from 'styled-breakpoints'
import styled from 'styled-components'
import scrollbar from '../../../style/scrollbar'
import TransactionsListItem, {
  TransactionsListItemProps,
} from './TransactionsListItem'

type Props = {
  transactions: TransactionsListItemProps[]
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
  const { transactions } = props

  return (
    <TransactionsListRoot>
      {transactions.map(({ transactionInfo, status }, index) => {
        return (
          <TransactionsListItem
            status={status}
            transactionInfo={transactionInfo}
            key={index}
          />
        )
      })}
    </TransactionsListRoot>
  )
}

export default TransactionsList
