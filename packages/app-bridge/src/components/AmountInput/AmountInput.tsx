import InputNumber from 'rc-input-number'
import {ComponentProps, FC} from 'react'
import styled from 'styled-components'
import {Max} from './Max'

const Root = styled.div`
  display: flex;
  align-items: center;
`

const InputContainer = styled.div`
  flex: 1;

  input {
    border-width: 0;
    outline: none;
    font-family: Montserrat;
    font-style: normal;
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
      <InputContainer>
        <InputNumber
          max={1000000000}
          min={0.000001}
          placeholder="Amount"
          {...props}
        />
      </InputContainer>
      <Max />
    </Root>
  )
}
