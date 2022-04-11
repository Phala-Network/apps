import {useLocation} from '@reach/router'
import React from 'react'
import {down, up} from 'styled-breakpoints'
import styled, {css} from 'styled-components'
import MobileNavbar from './MobileNavbar'
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
            width: 960px;
          `
        : css`
            width: 100%;
          `}
  }
`

const BaseLayout: React.FC = (props) => {
  const {children} = props
  const {pathname} = useLocation()

  return (
    <HomePageWrap>
      <ContentWrap compact={/^\/(bridge|analytics|end-game)/.test(pathname)}>
        {children}
      </ContentWrap>
      <Navbar />
      <MobileNavbar />
    </HomePageWrap>
  )
}

export default BaseLayout
