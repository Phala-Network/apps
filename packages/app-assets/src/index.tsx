import {useEthereumAccountAtom, usePolkadotAccountAtom} from '@phala/app-store'
import {useBalance} from '@phala/react-hooks'
import {useErc20BalanceQuery} from '@phala/react-libs'
import {toFixed} from '@phala/utils'
import {Decimal} from 'decimal.js'
import {ethers} from 'ethers'
import React, {useMemo} from 'react'
import {Helmet} from 'react-helmet'
import {up} from 'styled-breakpoints'
import {useBreakpoint} from 'styled-breakpoints/react-styled'
import styled from 'styled-components'
import BalanceCard from './components/BalanceCard'
import {BlackHeader} from './components/BalanceCard/Header'
import Category from './components/Category'
import ComingSoonBox from './components/ComingSoonBox'
import {EthereumIcon} from './components/Icons/EthereumIcon'
import {KhalaIcon} from './components/Icons/KhalaIcon'
import usePHAPrice from './hooks/usePHAPrice'

const COMING_SOON_CATEGORIES: string[] = ['Parachain Assets', 'Bridge Assets']

const ContentWrapper = styled.div`
  flex: 1;
  box-sizing: border-box;

  ${up('md')} {
    padding-top: 56px;
    margin-left: 50px;
    border-left: 1px solid #cccccc;
    min-height: 100vh;
  }
`

const HomePage: React.FC = () => {
  const md = useBreakpoint(up('md'))
  const PHAPrice = usePHAPrice()
  const [polkadotAccount] = usePolkadotAccountAtom()
  const [ethereumAccount] = useEthereumAccountAtom()
  const polkadotAccountAddress = polkadotAccount?.address
  const ethereumAccountAddress = ethereumAccount?.address
  const polkadotAccountBalance = useBalance(polkadotAccountAddress)
  const {data: ethereumAccountBalance} = useErc20BalanceQuery(
    ethereumAccountAddress
  )

  // NOTE: copied from InputDataStep.tsx
  const polkadotAccountBalanceNumber = useMemo<Decimal | undefined>(
    () =>
      polkadotAccountBalance &&
      new Decimal(polkadotAccountBalance.toString()).div(10 ** 12),
    [polkadotAccountBalance]
  )

  // NOTE: copied from InputDataStep.tsx
  const ethereumAccountBalanceNumber = useMemo<Decimal | undefined>(() => {
    if (!ethereumAccountBalance) return
    const value = ethers.utils.formatUnits(
      ethereumAccountBalance as ethers.BigNumberish,
      18
    )
    if (value) return new Decimal(value)
    return
  }, [ethereumAccountBalance])

  const totalBalanceNumber = useMemo<Decimal | undefined>(() => {
    const numbers = [
      polkadotAccountBalanceNumber,
      ethereumAccountBalanceNumber,
    ].filter((v) => v !== undefined) as Decimal[]
    if (numbers.length) return Decimal.sum(...numbers)
    return
  }, [polkadotAccountBalanceNumber, ethereumAccountBalanceNumber])

  return (
    <>
      <Helmet>
        <title>Assets</title>
      </Helmet>
      <ContentWrapper>
        <Category
          title="Phala"
          description={`Total: ${
            totalBalanceNumber ? toFixed(totalBalanceNumber, 4) : '-'
          } PHA`}
        >
          {/* FIXME: balance can be preset with name and icon */}

          <BalanceCard
            themeType="white"
            header={
              <BlackHeader>
                <KhalaIcon width="24" height="24" />
                K-PHA
              </BlackHeader>
            }
            balance={polkadotAccountBalanceNumber}
            disableBridge
            disableConvert
            dollar={polkadotAccountBalanceNumber?.mul(PHAPrice)}
          ></BalanceCard>

          {md && (
            <BalanceCard
              themeType="white"
              header={
                <BlackHeader>
                  <EthereumIcon width="24" height="24" />
                  ERC-20 PHA
                </BlackHeader>
              }
              balance={ethereumAccountBalanceNumber}
              disableTransfer
              disableBridge
              disableConvert
              disableClaim
              dollar={ethereumAccountBalanceNumber?.mul(PHAPrice)}
            ></BalanceCard>
          )}
        </Category>
        {COMING_SOON_CATEGORIES.map((category) => (
          <Category title={category} key={category}>
            <ComingSoonBox>
              <div style={{fontWeight: 'bold'}}>{category}</div>
              <div>Coming Soon</div>
            </ComingSoonBox>
          </Category>
        ))}
      </ContentWrapper>
    </>
  )
}

export default HomePage
