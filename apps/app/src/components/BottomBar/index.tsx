import React from 'react'
import {up} from 'styled-breakpoints'
import styled from 'styled-components'
import CheckMore from './CheckMore'
import Links from './Links'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background-color: #fff;

  ${up('md')} {
    display: none;
  }
`

const BottomBar: React.FC = () => {
  return (
    <Wrapper>
      <Links />
      <CheckMore />
    </Wrapper>
  )
}

export default BottomBar
