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

  ${down('md')} {
    display: block;
    padding-top: 64px;
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
      <ContentWrap compact={/^\/analytics/.test(pathname)}>
        {children}
      </ContentWrap>
      <Navbar />
      <BottomBar />
    </HomePageWrap>
  )
}

export default BaseLayout
