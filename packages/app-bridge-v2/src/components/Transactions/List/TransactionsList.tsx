import {down} from 'styled-breakpoints'
import styled from 'styled-components'
import scrollbar from './scrollbar'
import TransactionsListItem from './TransactionsListItem'

type Props = {
  records: any
}

const TransactionsListRoot = styled.div`
  ${scrollbar}
  overflow-y: auto;
  opacity: 0;
  animation: 0.35s linear 0.15s opacity both;
  position: absolute;
  bottom: 50px;
  right: -2px;
  color: white;
  /* Bk 001 */
  background: #111111;
  /* Gn 002 */
  border: 2px solid #aad829;
  width: 500px;
  height: 280px;
  padding: 20px;
  box-sizing: border-box;

  ${down('sm')} {
    left: 0;
    right: 0;
    width: 100%;
  }

  @keyframes opacity {
    to {
      opacity: 1;
    }
  }
`

export const TransactionsList: React.FC<Props> = (props) => {
  const {records} = props

  return (
    <TransactionsListRoot>
      {records.map((record: any, index: number) => {
        return <TransactionsListItem record={record} key={index} />
      })}
    </TransactionsListRoot>
  )
}
