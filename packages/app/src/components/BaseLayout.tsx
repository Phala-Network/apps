import React from 'react'
import {down, up} from 'styled-breakpoints'
import styled, {css} from 'styled-components'
import {useLocation} from '@reach/router'
import MobileNav from './MobileNav'
import Navbar from './Navbar'

const HomePageWrap = styled.div`
  padding-top: 80px;
  ${up('md')} {
    display: flex;
  }

  ${down('sm')} {
    display: block;
    padding-top: 40px;
  }
`

const ContentWrap = styled.div<{isDelegate?: boolean}>`
  margin: 0 auto;
  ${(props) =>
    props.isDelegate
      ? css`
          width: 100%;
          max-width: 1700px;
        `
      : css`
          width: 960px;
        `}
`

const BaseLayout: React.FC = (props) => {
  const {children} = props
  const {pathname} = useLocation()

  return (
    <HomePageWrap>
      <ContentWrap isDelegate={/^\/(delegate|mining)/.test(pathname)}>
        {children}
      </ContentWrap>
      <Navbar />
      <MobileNav />
    </HomePageWrap>
  )
}

export default BaseLayout
