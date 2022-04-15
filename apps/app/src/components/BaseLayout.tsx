import {useLocation} from '@reach/router'
import React, {ReactNode} from 'react'
import {down, up} from 'styled-breakpoints'
import styled, {css} from 'styled-components'
import BottomBar from './BottomBar'
import Navbar from './Navbar'

const HomePageWrap = styled.div`
  padding-top: 80px;
  ${up('md')} {
    display: flex;
  }

  ${down('sm')} {
    display: block;
    padding-top: 72px;
    padding-bottom: 72px;
  }
`

const ContentWrap = styled.div<{compact?: boolean}>`
  margin: 0 auto;
  ${up('md')} {
    ${(props) =>
      props.compact
        ? css`
            width: 1200px;
          `
        : css`
            width: 100%;
          `}
  }
`

const BaseLayout: React.FC<{children: ReactNode}> = (props) => {
  const {children} = props
  const {pathname} = useLocation()

  return (
    <HomePageWrap>
      <ContentWrap compact={/^\/(bridge|analytics|end-game)/.test(pathname)}>
        {children}
      </ContentWrap>
      <Navbar />
      <BottomBar />
    </HomePageWrap>
  )
}

export default BaseLayout
