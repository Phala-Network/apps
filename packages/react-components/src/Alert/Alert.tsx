import React, {ComponentProps} from 'react'
import styled from 'styled-components'
import Icon from './Icon'

const Root = styled.div`
  background: #f3ffd3;
  color: #494949;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  padding: 12px;
  display: grid;
  grid-template-columns: 20px 1fr;
  grid-gap: 8px;
  align-items: center;
`

export const Alert: React.FC<ComponentProps<typeof Root>> = (props) => {
  const {children, ...rest} = props

  return (
    <Root {...rest}>
      <Icon></Icon>
      {children}
    </Root>
  )
}
