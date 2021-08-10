import { Decimal } from 'decimal.js'
import { useAtom } from 'jotai'
import React, { useMemo } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { ethers } from 'ethers'
import { up } from 'styled-breakpoints'
import { useBreakpoint } from 'styled-breakpoints/react-styled'
import polkadotAccountAtom from '../../atoms/polkadotAccountAtom'
import ethereumAccountAtom from '../../atoms/ethereumAccountAtom'
import { useErc20BalanceQuery } from '../../libs/ethereum/queries/useErc20BalanceQuery'
import { useBalance } from '../../hooks/useBalance'
import EthereumIcon from '../../icons/ethereum.svg'
import usePHAPrice from '../../hooks/usePHAPrice'
import KhalaIcon from '../../icons/khala.svg'
import BalanceCard from '../BalanceCard'
import { BlackHeader } from '../BalanceCard/Header'
import Category from '../Category'
import ComingSoonBox from '../ComingSoonBox'
import toFixed from '../../utils/toFixed'

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
  const [polkadotAccount] = useAtom(polkadotAccountAtom)
  const [ethereumAccount] = useAtom(ethereumAccountAtom)
  const polkadotAccountAddress = polkadotAccount?.address
  const ethereumAccountAddress = ethereumAccount?.address
  const polkadotAccountBalance = useBalance(polkadotAccountAddress)
  const { data: ethereumAccountBalance } = useErc20BalanceQuery(
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
  }, [ethereumAccountBalance])

  const totalBalanceNumber = useMemo<Decimal | undefined>(() => {
    const numbers = [
      polkadotAccountBalanceNumber,
      ethereumAccountBalanceNumber,
    ].filter((v) => v !== undefined) as Decimal[]
    if (numbers.length) return Decimal.sum(...numbers)
  }, [polkadotAccountBalanceNumber, ethereumAccountBalanceNumber])

  return (
    <>
      <Helmet>
        <title>Phala App</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Helmet>
      <ContentWrapper>
        <Category
          title="Phala"
          description={`Total: ${
            totalBalanceNumber ? toFixed(totalBalanceNumber, 4) : '-'
          } PHA`}>
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
            disableTransfer
            disableBridge
            disableConvert
            dollar={polkadotAccountBalanceNumber?.mul(PHAPrice)}></BalanceCard>

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
              dollar={ethereumAccountBalanceNumber?.mul(
                PHAPrice
              )}></BalanceCard>
          )}
        </Category>
        {COMING_SOON_CATEGORIES.map((category) => (
          <Category title={category} key={category}>
            <ComingSoonBox>
              <div style={{ fontWeight: 'bold' }}>{category}</div>
              <div>Coming Soon</div>
            </ComingSoonBox>
          </Category>
        ))}
      </ContentWrapper>
    </>
  )
}

export default HomePage
