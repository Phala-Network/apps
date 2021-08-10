import React from 'react'
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

const Alert: React.FC = (props) => {
  const { children, ...rest } = props

  return (
    <Root {...rest}>
      <Icon></Icon>
      {children}
    </Root>
  )
}

export default Alert
