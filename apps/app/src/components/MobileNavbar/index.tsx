import React from 'react'
import {up} from 'styled-breakpoints'
import styled from 'styled-components'
import BottomBar from './BottomBar'
import TopBar from './TopBar'

const Wrapper = styled.div`
  ${up('md')} {
    display: none;
  }
`

const MobileNavbar: React.FC = () => {
  return (
    <Wrapper>
      <TopBar />
      <BottomBar />
    </Wrapper>
  )
}

export default MobileNavbar
