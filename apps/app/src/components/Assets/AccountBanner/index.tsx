import {useSSR} from '@phala/react-hooks'
import {useCurrentAccount} from '@phala/store'
import {formatCurrency} from '@phala/utils'
import Decimal from 'decimal.js'
import React from 'react'
import {down, up} from 'styled-breakpoints'
import styled from 'styled-components'
import bannerBg from '../Icons/banner-bg.png'
import {PhalaIcon} from '../Icons/PhalaIcon'
import AccountInfo from './AccountInfo'

const Wrapper = styled.div`
  background-color: #111111;
  background-image: url(${bannerBg});
  background-repeat: no-repeat;
  background-position: right;
  background-size: contain;
  height: 240px;

  ${down('md')} {
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

  ${down('md')} {
    flex-direction: column;
  }
`

const Left = styled.div`
  flex: 1;
  padding-top: 103px;
  padding-left: 85px;

  ${down('md')} {
    padding-top: 30px;
    padding-left: 20px;
  }
`

const Icon = styled.div`
  padding-top: 33px;
  padding-right: 95px;

  ${down('xl')} {
    padding-right: 50px;
  }

  ${down('lg')} {
    display: none;
  }
`

const Dollar = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 60px;
  line-height: 36px;
  color: #ffffff;
  padding-top: 113px;
  padding-right: 85px;

  ${down('md')} {
    font-size: 36px;
    line-height: 36px;
    padding-top: 0;
    padding-bottom: 30px;
    padding-left: 20px;
  }
`

type Props = {
  totalValue: Decimal | null
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
          {polkadotAccount && (
            <Dollar>
              {totalValue ? `$ ${formatCurrency(totalValue)}` : '-'}
            </Dollar>
          )}

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
