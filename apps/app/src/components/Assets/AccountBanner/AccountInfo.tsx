import {useSSR} from '@phala/react-hooks'
import {useCurrentAccount} from '@phala/store'
import {trimAddress} from '@phala/utils'
import {toaster} from 'baseui/toast'
import React, {MouseEventHandler, useMemo, useState} from 'react'
import {Copy} from 'react-feather'
import {down} from 'styled-breakpoints'
import {useBreakpoint} from 'styled-breakpoints/react-styled'
import styled from 'styled-components'
import {SelectAccountModal} from '../../SelectAccountModal'
import Button from '../Button'

const Wrapper = styled.div`
  display: grid;
  grid-column-gap: 23px;
  grid-template-rows: 36px 48px;
  grid-template-columns: auto 1fr;
  grid-template-areas: 'Name Button' 'Address Address';

  ${down('md')} {
    grid-template-rows: 20px 21px;
    grid-template-columns: 1fr auto;
    grid-template-areas: 'Name Button' 'Address .';
  }
`

const Name = styled.div`
  grid-area: Name;
  font-weight: 600;
  font-size: 36px;
  line-height: 36px;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${down('md')} {
    font-size: 20px;
    line-height: 20px;
  }
`

const ButtonWrapper = styled.div`
  grid-area: Button;
  padding-top: 4px;
  padding-right: 30px;

  ${down('md')} {
    padding-top: 0;
  }
`

const AddressWrapper = styled.div`
  grid-area: Address;
  padding-top: 16px;

  svg {
    cursor: pointer;
    color: #8c8c8c;
    :hover {
      color: #aad829;
    }
  }

  ${down('md')} {
    padding-top: 8px;
  }
`
const Address = styled.a`
  font-size: 16px;
  line-height: 16px;
  color: #aad829;
  display: inline-block;
  margin-right: 10px;
  position: relative;
  transform: translateY(-4px);

  ${down('md')} {
    font-size: 12px;
    line-height: 16px;
  }
`
const HrefAddress = styled(Address)`
  :hover {
    padding-bottom: 2px;
    border-bottom: 1px solid #aad829;
  }
`

const AccountInfo: React.FC = () => {
  const [selectAccountModalViable, setSelectAccountModalViable] =
    useState(false)
  const [polkadotAccount] = useCurrentAccount()
  const isMobile = useBreakpoint(down('md'))
  const isPad = useBreakpoint(down('lg'))

  const {isServer} = useSSR()

  const addressVale = useMemo(() => {
    if (!polkadotAccount) {
      return 'To host, connect, and gain in the world of Web3'
    }
    if (isPad) return trimAddress(polkadotAccount.address)
    return polkadotAccount.address
  }, [isPad, polkadotAccount])

  const onClick: MouseEventHandler<SVGSVGElement> = (e) => {
    e.stopPropagation()
    if (polkadotAccount) {
      navigator.clipboard.writeText(polkadotAccount.address).then(() => {
        toaster.info('Copied to clipboard', {})
      })
    }
  }

  if (isServer) return null
  return (
    <>
      <Wrapper>
        <Name>
          {!polkadotAccount ? 'Portal to Web3' : polkadotAccount.name}
        </Name>
        {!polkadotAccount && isMobile ? null : (
          <ButtonWrapper>
            <Button onClick={() => setSelectAccountModalViable(true)}>
              {!polkadotAccount ? 'Connect Wallet' : 'Change'}
            </Button>
          </ButtonWrapper>
        )}
        <AddressWrapper>
          {!polkadotAccount ? (
            <Address>{addressVale}</Address>
          ) : (
            <HrefAddress
              href={`https://khala.subscan.io/account/${polkadotAccount?.address}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {addressVale}
            </HrefAddress>
          )}

          {polkadotAccount && (
            <Copy
              onClick={onClick}
              width={isMobile ? '13' : '26'}
              height={isMobile ? '13' : '26'}
            />
          )}
        </AddressWrapper>
      </Wrapper>
      <SelectAccountModal
        dappName="Phala App"
        onClose={() => setSelectAccountModalViable(false)}
        isOpen={selectAccountModalViable}
      />
    </>
  )
}

export default AccountInfo
