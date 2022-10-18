import {formatCurrency} from '@phala/utils'
import {Block} from 'baseui/block'
import {Skeleton} from 'baseui/skeleton'
import {ParagraphSmall} from 'baseui/typography'
import Decimal from 'decimal.js'
import {FC, ReactNode, useMemo} from 'react'
import styled from 'styled-components'
import {StakePoolQuery} from '../../hooks/graphql'
import SettingButton from './SettingButton'

type StakePool = StakePoolQuery['findUniqueStakePools']

const StyledBlock = styled(Block)`
  & > div + div {
    border-top: 1px dashed hsla(0, 0%, 0%, 0.08);
  }
`

const Item: FC<{label: string; action?: ReactNode; children: ReactNode}> = ({
  label,
  action,
  children,
}) => {
  const value = useMemo(
    () =>
      children === null
        ? '∞'
        : typeof children === 'string' && `${formatCurrency(children)} PHA`,
    [children]
  )

  return (
    <Block
      display="flex"
      justifyContent="space-between"
      paddingTop="scale400"
      paddingBottom="scale400"
    >
      <Block display="flex" alignItems="center">
        <ParagraphSmall as="div" color="contentSecondary">
          {label}
        </ParagraphSmall>
        {action}
      </Block>
      {value ? (
        <ParagraphSmall as="div">{value}</ParagraphSmall>
      ) : (
        <Skeleton animation width="128px" height="20px" />
      )}
    </Block>
  )
}

const StakeInfo: FC<{
  stakePool: StakePool
  isOwner: boolean
  onSetCap: () => void
}> = ({stakePool, isOwner, onSetCap}) => {
  const {
    cap,
    remainingStake,
    totalStake,
    freeStake,
    releasingStake,
    stakePoolWithdrawals,
    availableStake,
  } = stakePool || {}

  const withdrawing = useMemo(
    () =>
      stakePoolWithdrawals &&
      stakePoolWithdrawals
        .reduce((acc, cur) => acc.add(cur.stake), new Decimal(0))
        .toString(),
    [stakePoolWithdrawals]
  )

  return (
    <>
      <StyledBlock>
        <Item
          label="Cap"
          action={
            isOwner && (
              <Block marginTop="-8px" marginBottom="-8px">
                <SettingButton onClick={onSetCap} />
              </Block>
            )
          }
        >
          {cap}
        </Item>
        <Item label="Remaining">{remainingStake}</Item>
        <Item label="Delegated">{totalStake}</Item>
        <Item label="Free">{freeStake}</Item>
        <Item label="Stake">
          {totalStake &&
            freeStake &&
            new Decimal(totalStake).minus(freeStake).toString()}
        </Item>
      </StyledBlock>

      <StyledBlock>
        <Item label="Releasing">{releasingStake}</Item>
        <Item label="Withdrawing">{withdrawing}</Item>
        <Item label="Delegable">{availableStake}</Item>
      </StyledBlock>
    </>
  )
}

export default StakeInfo
