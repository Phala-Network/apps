import {formatCurrency} from '@phala/utils'
import {Block} from 'baseui/block'
import {Skeleton} from 'baseui/skeleton'
import {ParagraphSmall} from 'baseui/typography'
import Decimal from 'decimal.js'
import {FC, ReactNode, useMemo} from 'react'
import styled from 'styled-components'
import {StakePool} from '../../hooks/subsquid'
import SettingButton from './SettingButton'

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
  stakePool?: Omit<StakePool, 'owner' | 'miners' | 'workers' | 'stakes'> | null
  isOwner: boolean
  onSetCap: () => void
}> = ({stakePool, isOwner, onSetCap}) => {
  const {
    capacity,
    totalStake,
    freeStake,
    releasingStake,
    totalWithdrawal,
    delegable,
  } = stakePool || {}

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
          {capacity}
        </Item>

        <Item label="Delegated">{totalStake}</Item>
        <Item label="Free">{freeStake}</Item>
        <Item label="Stake">
          {totalStake &&
            freeStake &&
            new Decimal(totalStake).minus(freeStake).toString()}
        </Item>
      </StyledBlock>

      <StyledBlock>
        <Item label="Delegable">{delegable}</Item>
        <Item label="Remaining">
          {capacity &&
            totalStake &&
            new Decimal(capacity).minus(totalStake).toString()}
        </Item>
        <Item label="Withdrawing">{totalWithdrawal}</Item>
        <Item label="Releasing">{releasingStake}</Item>
      </StyledBlock>
    </>
  )
}

export default StakeInfo
