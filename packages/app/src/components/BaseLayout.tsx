import React from 'react'
import {down, up} from 'styled-breakpoints'
import styled from 'styled-components'
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

const ContentWrap = styled.div`
  margin: 80px auto auto;
`

const BaseLayout: React.FC = (props) => {
  const {children} = props

  return (
    <HomePageWrap>
      {/* <Sider>
        <SideNav></SideNav>
        <Tickets></Tickets>
      </Sider> */}

      <Navbar />

      <ContentWrap>{children}</ContentWrap>

      <MobileNav />
    </HomePageWrap>
  )
}

export default BaseLayout
