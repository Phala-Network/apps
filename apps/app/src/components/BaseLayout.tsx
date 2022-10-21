import {FC, ReactNode} from 'react'
import {down} from 'styled-breakpoints'
import styled from 'styled-components'
import BottomBar from './BottomBar'
import Navbar from './Navbar'

const PageContainer = styled.div`
  padding-top: 80px;

  ${down('md')} {
    padding-top: 64px;
    padding-bottom: 72px;
  }
`

const BaseLayout: FC<{children: ReactNode}> = (props) => {
  const {children} = props

  return (
    <PageContainer>
      {children}
      <Navbar />
      <BottomBar />
    </PageContainer>
  )
}

export default BaseLayout
