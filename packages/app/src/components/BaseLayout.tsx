import React from 'react'
import {down, up} from 'styled-breakpoints'
import styled, {css} from 'styled-components'
import {useLocation} from '@reach/router'
import MobileNav from './MobileNav'
import Navbar from './Navbar'

const HomePageWrap = styled.div`
  ${up('md')} {
    display: flex;
  }

  ${down('sm')} {
    display: block;
    padding-top: 40px;
  }
`

const ContentWrap = styled.div<{isDelegate?: boolean}>`
  margin: 80px auto auto;
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
      <Navbar />

      <ContentWrap isDelegate={pathname.includes('/delegate')}>
        {children}
      </ContentWrap>

      <MobileNav />
    </HomePageWrap>
  )
}

export default BaseLayout
