import React, { useRef, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { down } from 'styled-breakpoints'
import Decimal from 'decimal.js'
import toFixed from '../../utils/toFixed'
import Dollar from './Dollar'
import Menu, { MenuProps } from './Menu'
import { useHoverDirty } from 'react-use'

type Props = {
  themeType: 'black' | 'white'
  balance?: Decimal | number
  header: React.ReactNode
  dollar?: Decimal | number
} & MenuProps

const Wrap = styled.div<{ active: boolean }>`
  width: 144px;
  height: 128px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* cursor: pointer; */
  transition: transform 0.2s linear;
  box-sizing: border-box;

  ${(props) =>
    props.active
      ? css`
          transform: translate3d(-10px, -10px, 0);
        `
      : css`
          transform: translate3d(0, 0, 0);
        `}

  &.black {
    background: #202020;
    color: #ececec;
  }

  &.white {
    color: #202020;
    background: #ffffff;
  }

  ${down('sm')} {
    width: 100%;
    height: 108px;
    padding: 12px;
  }
`

const Balance = styled.div`
  position: relative;
  font-family: PT Mono;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  flex: 1;
  margin-top: 16px;
  word-break: break-all;
  ${down('sm')} {
    margin-top: 7px;
    line-height: 25px;
  }
`

const Background = styled.div`
  width: 144px;
  height: 128px;
  background-color: #cccccc;
  margin-top: 50px;
  margin-right: 30px;
  ${down('sm')} {
    margin-top: 18px;
    margin-right: 0;
    width: 100%;
    height: 108px;
  }
`

const BalanceCard: React.FC<Props> = (props) => {
  const {
    themeType,
    balance,
    header,
    disableTransfer,
    disableBridge,
    disableConvert,
    disableClaim,
    dollar,
  } = props
  const menuRef = useRef<HTMLDivElement>(null)
  const hovered = useHoverDirty(menuRef)
  const interactive = useMemo<boolean>(
    () =>
      [disableBridge, disableTransfer, disableConvert, disableClaim].some(
        (v) => !v
      ),
    [disableBridge, disableTransfer, disableConvert, disableClaim]
  )
  // NOTE: if every feature is disabled, the menu will not be active
  const active = interactive && hovered

  return (
    <Background>
      <Wrap active={active} className={themeType}>
        {header}
        <Balance>{balance === undefined ? '-' : toFixed(balance)}</Balance>
        <Dollar themeType={themeType}>
          {dollar === undefined ? '-' : toFixed(dollar, 2)}
        </Dollar>
        <Menu
          ref={menuRef}
          active={active}
          disableTransfer={disableTransfer}
          disableBridge={disableBridge}
          disableConvert={disableConvert}
          disableClaim={disableClaim}></Menu>
      </Wrap>
    </Background>
  )
}

export default BalanceCard
