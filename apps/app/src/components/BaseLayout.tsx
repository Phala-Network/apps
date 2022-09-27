import {useLocation} from '@reach/router'
import {Notification} from 'baseui/notification'
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
      <ContentWrap compact={/^\/(bridge|analytics)/.test(pathname)}>
        <Notification
          kind="warning"
          overrides={{
            Body: {
              style: {
                margin: 0,
                width: 'auto',
                fontSize: '14px',
              },
            },
          }}
        >
          There will be database update on September 28, 2022, from 2:00 PM to
          8:00 PM UTC+0. The Phala App will be affected during the update.
          Please go to Polkadot.js to initiate transactions at that time. Sorry
          for any inconvenience caused!
        </Notification>
        {children}
      </ContentWrap>
      <Navbar />
      <BottomBar />
    </HomePageWrap>
  )
}

export default BaseLayout
