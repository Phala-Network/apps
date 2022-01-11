import InputNumber from 'rc-input-number'
import {ComponentProps, FC} from 'react'
import styled from 'styled-components'

const Root = styled.div`
  input {
    border-width: 0;
    outline: none;
    /* 金额 M */
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 32px;
    line-height: 32px;
    /* identical to box height, or 100% */
    display: flex;
    align-items: center;
    /* Bk 001 */
    color: #111111;
    background-color: transparent;
  }
`

export const AmountInput: FC<ComponentProps<typeof InputNumber>> = (props) => {
  return (
    <Root>
      <InputNumber min={0.00000001} placeholder="Amount" {...props} />
    </Root>
  )
}
