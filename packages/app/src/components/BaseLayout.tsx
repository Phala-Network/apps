import React from 'react'
import {down, up} from 'styled-breakpoints'
import styled from 'styled-components'
import {useLocation} from '@reach/router'
import MobileNav from './MobileNav'
// import SideNav from './SideNav'
// import Tickets from './Tickets'
import Navbar from './Navbar'

const HomePageWrap = styled.div`
  ${up('md')} {
    display: flex;
    /* padding-left: 230px; */
  }

  ${down('sm')} {
    display: block;
    padding-top: 40px;
  }
`

// const Sider = styled.div`
//   ${down('sm')} {
//     display: none;
//   }
// `

const ContentWrap = styled.div<{isDelegate?: boolean}>`
  margin: 80px auto auto;
  width: ${(props) => (props.isDelegate ? '100%' : '960px')};
`

const BaseLayout: React.FC = (props) => {
  const {children} = props
  const {pathname} = useLocation()

  return (
    <HomePageWrap>
      {/* <Sider>
        <SideNav></SideNav>
        <Tickets></Tickets>
      </Sider> */}

      <Navbar />

      <ContentWrap isDelegate={pathname.includes('/delegate')}>
        {children}
      </ContentWrap>

      <MobileNav />
    </HomePageWrap>
  )
}

export default BaseLayout
