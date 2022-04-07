import React from 'react'
import styled from 'styled-components'
import {down, up} from 'styled-breakpoints'
import {useSSR} from '@phala/react-hooks'
import {useCurrentAccount} from '@phala/app-store'
import {formatCurrency} from '@phala/utils'
import bannerBg from '../Icons/banner-bg.png'
import AccountInfo from './AccountInfo'
import {PhalaIcon} from '../Icons/PhalaIcon'

const Wrapper = styled.div`
  background-color: #111111;
  background-image: url(${bannerBg});
  background-repeat: no-repeat;
  background-position: right;
  background-size: contain;
  height: 240px;

  ${down('sm')} {
    height: 192px;
  }
`

const Content = styled.div`
  display: flex;
  height: 100%;

  ${up('md')} {
    margin: 0 auto;
    max-width: 1440px;
  }

  ${down('sm')} {
    flex-direction: column;
  }
`

const Left = styled.div`
  flex: 1;
  padding-top: 103px;
  padding-left: 85px;

  ${down('sm')} {
    padding-top: 30px;
    padding-left: 20px;
  }
`

const Icon = styled.div`
  padding-top: 33px;
  padding-right: 95px;

  ${down('lg')} {
    padding-right: 50px;
  }

  ${down('md')} {
    display: none;
  }
`

const Dollar = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 60px;
  line-height: 36px;
  color: #ffffff;
  padding-top: 113px;
  padding-right: 85px;

  ${down('sm')} {
    font-size: 36px;
    line-height: 36px;
    padding-top: 0;
    padding-bottom: 30px;
    padding-left: 20px;
  }
`

type Props = {
  totalValue: string
}

const AccountBanner: React.FC<Props> = ({totalValue}) => {
  const [polkadotAccount] = useCurrentAccount()
  const {isBrowser} = useSSR()

  return (
    <Wrapper>
      <Content>
        <Left>
          <AccountInfo />
        </Left>
        <div>
          {isBrowser && polkadotAccount ? (
            <Dollar>
              {Number(totalValue) ? `$ ${formatCurrency(totalValue)}` : '-'}
            </Dollar>
          ) : null}
          {isBrowser && !polkadotAccount ? (
            <Icon>
              <PhalaIcon />
            </Icon>
          ) : null}
        </div>
      </Content>
    </Wrapper>
  )
}

export default AccountBanner
