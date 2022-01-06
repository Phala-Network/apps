import React from 'react'
import styled from 'styled-components'
import Links from './Links'
import CheckMore from './CheckMore'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 72px;
  background-color: #fff;
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
