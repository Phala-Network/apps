import React, { ComponentProps } from 'react'
import styled from 'styled-components'
import { voidFn } from '../../types/normal'
import Spacer from '../Spacer'

/* #region  style */
const TransactionsHeaderRoot = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding: 8px 16px;
  background: #ffffff;
  z-index: 1;
  cursor: pointer;
  width: fit-content;

  &:hover {
    opacity: 0.8;
  }
`

const Title = styled.div`
  color: #000000;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
`
/* #endregion */

/* #region  props */
type Props = ComponentProps<typeof TransactionsHeaderRoot> & {
  active: boolean
  onClickHeader: voidFn
}
/* #endregion */

const TransactionsHeader: React.FC<Props> = (props) => {
  const { onClickHeader, active, ...others } = props

  return (
    <TransactionsHeaderRoot onClick={onClickHeader} {...others}>
      {active ? (
        <svg
          width="9"
          height="10"
          viewBox="0 0 9 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 9.34589L9 9.5L8.84589 0.5H6.88045L6.88045 7.38045L0 7.38045V9.34589Z"
            fill="black"
          />
        </svg>
      ) : (
        <svg
          width="9"
          height="10"
          viewBox="0 0 9 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 0.654111L0 0.5L0.154109 9.5H2.11955L2.11955 2.61955L9 2.61955V0.654111Z"
            fill="black"
          />
        </svg>
      )}

      <Spacer x={0.6}></Spacer>

      <Title>Transactions Panel</Title>
    </TransactionsHeaderRoot>
  )
}

export default TransactionsHeader
