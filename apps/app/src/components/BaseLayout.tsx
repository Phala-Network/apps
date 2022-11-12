import {FC, ReactNode} from 'react'
import {down} from 'styled-breakpoints'
import styled from 'styled-components'
import BottomBar from './BottomBar'
import EmergencyNotification from './EmergencyNotification'
import HalvingPeriodNotification from './HalvingPeriodNotification'
import Navbar from './Navbar'

const PageContainer = styled.div`
  padding-top: 80px;

  ${down('md')} {
    padding-top: 64px;
    padding-bottom: 64px;
  }
`

const BaseLayout: FC<{children: ReactNode}> = (props) => {
  const {children} = props

  return (
    <PageContainer>
      <HalvingPeriodNotification />
      <EmergencyNotification />
      {children}
      <Navbar />
      <BottomBar />
    </PageContainer>
  )
}

export default BaseLayout
