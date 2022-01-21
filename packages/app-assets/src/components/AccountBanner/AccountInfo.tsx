import React, {useMemo, useState, MouseEventHandler} from 'react'
import styled from 'styled-components'
import {down} from 'styled-breakpoints'
import {useBreakpoint} from 'styled-breakpoints/react-styled'
import {usePolkadotAccountAtom} from '@phala/app-store'
import {trimAddress} from '@phala/utils'
import {PolkadotAccountModal} from '@phala/react-components'
import {useClipboard} from '@phala/react-hooks'
import {toast} from 'react-toastify'
import {useSSR} from '@phala/react-hooks'
import {CopyIcon} from '../Icons/CopyIcon'
import Button from '../Button'

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

  svg {
    fill: #8c8c8c;
    :hover {
      fill: #aad829;
    }
  }

  ${down('sm')} {
    padding-top: 8px;
  }
`
const Address = styled.a`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  color: #aad829;
  display: inline-block;
  margin-right: 10px;
  position: relative;
  transform: translateY(-4px);

  ${down('sm')} {
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
  const [polkadotAccount] = usePolkadotAccountAtom()
  const isMobile = useBreakpoint(down('sm'))
  const isPad = useBreakpoint(down('md'))

  const {isServer} = useSSR()

  const addressVale = useMemo(() => {
    if (!polkadotAccount) {
      return 'To host, connect, and gain in the world of Web3'
    }
    if (isPad) return trimAddress(polkadotAccount.address)
    return polkadotAccount.address
  }, [isPad, polkadotAccount])

  const {copy} = useClipboard()

  const onClick: MouseEventHandler<SVGSVGElement> = (e) => {
    e.stopPropagation()
    if (polkadotAccount) {
      copy(polkadotAccount.address)
      toast('Copied to clipboard')
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

          {!polkadotAccount ? null : (
            <CopyIcon
              onClick={onClick}
              width={isMobile ? '13' : '26'}
              height={isMobile ? '13' : '26'}
            />
          )}
        </AddressWrapper>
      </Wrapper>
      <PolkadotAccountModal
        onClose={() => setSelectAccountModalViable(false)}
        visible={selectAccountModalViable}
      />
    </>
  )
}

export default AccountInfo
