import { ComponentProps, FC } from 'react'
import styled from 'styled-components'
import BlockStripe from '../BlockStripe'

export const Header = styled.div`
  font-family: Lato;
  height: 24px;
  padding: 0 8px;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;

  & > svg {
    margin-left: -8px;
  }
`

export const BlackHeader = styled(Header)`
  background-color: #202020;
  color: #ffffff;
`

export const WhiteHeader = styled(Header)`
  background-color: #ffffff;
  color: #202020;
`

export const PrimaryHeader = styled(Header)`
  background-color: ${(props) => props.theme.colors.phala};
  color: #202020;
`

const StripeHeaderWrap = styled(Header)`
  color: ${(props) => props.theme.colors.phala};
`

export const StripeHeader: FC<ComponentProps<typeof StripeHeaderWrap>> = (
  props
) => {
  return (
    <BlockStripe
      {...{
        color: 'black',
        blockSize: 6,
        column: 22,
        row: 4,
        colorCheck(status, index) {
          return index < 30 ? true : status > 0.3
        },
      }}>
      <StripeHeaderWrap {...props}></StripeHeaderWrap>
    </BlockStripe>
  )
}
