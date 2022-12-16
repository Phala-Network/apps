import {Block} from 'baseui/block'
import {StyledLink} from 'baseui/link'
import {ParagraphSmall} from 'baseui/typography'
import {FC, ReactNode} from 'react'
import {down} from 'styled-breakpoints'
import styled from 'styled-components'
import BottomBar from './BottomBar'
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
      <Block
        padding="scale500"
        backgroundColor="#d1ff52"
        display="flex"
        justifyContent="center"
      >
        <ParagraphSmall as="div">
          On-chain upgrading. Until the 21st Dec, you will not be able to
          perform any on-chain operations, Phala App 2.0 will be launched on
          22nd Dec.
          <StyledLink
            href="https://twitter.com/phalanetwork/status/1603743551351058434"
            target="_blank"
            $style={{marginLeft: '12px'}}
          >
            Learn More
          </StyledLink>
        </ParagraphSmall>
      </Block>
      {children}
      <Navbar />
      <BottomBar />
    </PageContainer>
  )
}

export default BaseLayout
