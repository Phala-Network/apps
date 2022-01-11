import React, {useMemo} from 'react'
import styled from 'styled-components'
import {down} from 'styled-breakpoints'
import {useBreakpoint} from 'styled-breakpoints/react-styled'
import {Button, SHAPE} from 'baseui/button'
import {usePolkadotAccountAtom} from '@phala/app-store'
import {trimAddress} from '@phala/utils'
import {CopyIcon} from '../Icons/CopyIcon'

const Wrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-column-gap: 23px;
  grid-template-rows: 36px 48px;
  grid-template-columns: auto 1fr;
  grid-template-areas: 'Name Button' 'Address Address';

  ${down('sm')} {
    grid-template-rows: 20px 21px;
    grid-template-columns: 1fr auto;
    grid-template-areas: 'Name Button' 'Address .';
  }
`

const Name = styled.div`
  grid-area: Name;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 36px;
  color: #ffffff;

  ${down('sm')} {
    font-size: 20px;
    line-height: 20px;
  }
`

const ButtonWrapper = styled.div`
  grid-area: Button;
  padding-top: 4px;
  padding-right: 30px;

  ${down('sm')} {
    padding-top: 0;
  }
`

const AddressWrapper = styled.div`
  grid-area: Address;
  padding-top: 16px;

  ${down('sm')} {
    padding-top: 8px;
  }
`

const Address = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  color: #aad829;
  display: inline-block;
  padding-right: 10px;
  position: relative;
  transform: translateY(-4px);

  ${down('sm')} {
    font-size: 12px;
    line-height: 16px;
  }
`

const AccountInfo: React.FC = () => {
  const [polkadotAccount] = usePolkadotAccountAtom()
  const isMobile = useBreakpoint(down('sm'))
  const isPad = useBreakpoint(down('md'))

  const addressVale = useMemo(() => {
    if (!polkadotAccount) {
      return 'Earn , Transfer , Operate in the world of Web3'
    }
    if (isPad) return trimAddress(polkadotAccount.address)
    return polkadotAccount.address
  }, [isPad, polkadotAccount])

  const copyIcon = useMemo(() => {
    if (isMobile) return <CopyIcon width="13" height="13" />
    return <CopyIcon />
  }, [isMobile])
  return (
    <Wrapper>
      <Name>
        {!polkadotAccount ? 'Participate in Phala' : polkadotAccount.name}
      </Name>
      {!polkadotAccount && isMobile ? null : (
        <ButtonWrapper>
          <Button
            onClick={() => alert('click')}
            shape={SHAPE.pill}
            isSelected
            overrides={{
              BaseButton: {
                style: () => ({
                  outline: `1px solid #D1FF52`,
                  backgroundColor: '#D1FF52',
                  borderRadius: '14px',
                  padding: '6px 18px',
                  color: '#111111',
                  fontFamily: 'Montserrat',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '16px',
                }),
              },
            }}
          >
            {!polkadotAccount ? 'Connect Wallet' : 'Change'}
          </Button>
        </ButtonWrapper>
      )}
      <AddressWrapper>
        <Address>{addressVale}</Address>
        {!polkadotAccount ? null : copyIcon}
      </AddressWrapper>
    </Wrapper>
  )
}

export default AccountInfo
