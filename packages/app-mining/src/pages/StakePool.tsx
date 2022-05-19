import {useCurrentAccount} from '@phala/store'
import {toFixed, trimAddress} from '@phala/utils'
import {Block} from 'baseui/block'
import {Button} from 'baseui/button'
import {Card} from 'baseui/card'
import {StyledLink} from 'baseui/link'
import {HeadingLarge, HeadingSmall, ParagraphXSmall} from 'baseui/typography'
import Decimal from 'decimal.js'
import {PageProps} from 'gatsby'
import {FC, useCallback, useState} from 'react'
import {CheckCircle, MinusCircle} from 'react-feather'
import {Helmet} from 'react-helmet'
import styled from 'styled-components'
import Chart from '../components/StakePool/Chart'
import InfoCard from '../components/StakePool/InfoCard'
import SettingButton from '../components/StakePool/SettingButton'
import StakeInfo from '../components/StakePool/StakeInfo'
import WithdrawQueue from '../components/StakePool/WithdrawQueue'
import StakePoolModal, {StakePoolModalKey} from '../components/StakePoolModal'
import WorkerTableV2 from '../components/WorkerTableV2'
import {useStakePoolQuery} from '../hooks/graphql'
import {client} from '../utils/GraphQLClient'

export const VerifiedIcon = styled(CheckCircle).attrs({size: 16})`
  margin-left: 5px;
  position: relative;
  top: 2px;
`

export const UnVerifiedIcon = styled(MinusCircle).attrs({
  size: 16,
  color: 'rgb(112,112,112)',
})`
  margin-left: 5px;
  position: relative;
  top: 2px;
`

interface StakePoolProps extends PageProps {
  pid?: string
}

export const StakePool: FC<StakePoolProps> = ({pid}) => {
  const [modalKey, setModalKey] = useState<StakePoolModalKey | null>(null)
  const [polkadotAccount] = useCurrentAccount()
  const {data, isLoading} = useStakePoolQuery(
    client,
    {
      where: {
        pid: Number(pid),
      },
    },
    {
      enabled: Boolean(pid),
    }
  )
  const closeModal = useCallback(() => {
    setModalKey(null)
  }, [])

  const stakePool = data?.findUniqueStakePools

  const {
    stakePoolWithdrawals = [],
    theoreticalApr,
    commission,
    ownerAddress,
    accounts,
    stakersCount,
    minersCount,
    idleMinersCount,
  } = stakePool || {}

  const isOwner =
    Boolean(ownerAddress) && ownerAddress === polkadotAccount?.address

  return (
    <>
      <Helmet>
        <title>Stake Pool #{pid}</title>
      </Helmet>

      <Block
        paddingLeft="scale400"
        paddingRight="scale400"
        marginBottom="scale1200"
      >
        <Block
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          paddingTop="scale1200"
          paddingBottom="scale1200"
          maxWidth="1024px"
          margin="0 auto"
        >
          <HeadingLarge as="div">Stake Pool #{pid}</HeadingLarge>

          <Button onClick={() => setModalKey('delegate')}>Delegate</Button>
        </Block>

        <Block maxWidth="1024px" margin="0 auto">
          <Block
            display="grid"
            gridTemplateColumns="2fr 1fr 1fr 1fr 1fr"
            gridGap="scale400"
            $style={({$theme}: any) => ({
              [$theme.mediaQuery.medium]: {
                gridTemplateColumns: '1fr 1fr',
              },
            })}
          >
            <InfoCard
              label="Owner"
              extra={
                ownerAddress && (
                  <ParagraphXSmall as="div">
                    <StyledLink
                      href={`https://khala.subscan.io/account/${ownerAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {trimAddress(ownerAddress)}
                    </StyledLink>
                  </ParagraphXSmall>
                )
              }
            >
              {ownerAddress &&
                accounts &&
                (accounts.identity || trimAddress(ownerAddress))}
              {accounts && accounts.identity ? (
                accounts.identityVerified ? (
                  <VerifiedIcon />
                ) : (
                  <UnVerifiedIcon />
                )
              ) : null}
            </InfoCard>
            <InfoCard label="APR">
              {theoreticalApr &&
                `${toFixed(new Decimal(theoreticalApr).times(100), 2)}%`}
            </InfoCard>
            <InfoCard
              label="Commission"
              action={
                isOwner && (
                  <SettingButton onClick={() => setModalKey('setCommission')} />
                )
              }
            >
              {commission &&
                `${toFixed(new Decimal(commission).times(100), 2)}%`}
            </InfoCard>
            <InfoCard
              label="Worker"
              extra={
                typeof idleMinersCount === 'number' && (
                  <ParagraphXSmall as="div" color="contentSecondary">
                    {idleMinersCount} Mining
                  </ParagraphXSmall>
                )
              }
            >
              {minersCount}
            </InfoCard>
            <InfoCard label="Delegator">{stakersCount}</InfoCard>
          </Block>

          <HeadingSmall marginTop="scale1200" marginBottom="scale400">
            Stake Info
          </HeadingSmall>
          <Card
            overrides={{
              Root: {
                style: ({$theme}) => ({
                  borderRadius: '0',
                  ...$theme.borders.border200,
                }),
              },
              Body: {
                style: ({$theme}) => ({
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: $theme.sizing.scale800,
                  [$theme.mediaQuery.medium]: {
                    gridTemplateColumns: '1fr',
                  },
                }),
              },
            }}
          >
            <StakeInfo
              stakePool={stakePool}
              isOwner={isOwner}
              onSetCap={() => setModalKey('setCap')}
            />
          </Card>

          <HeadingSmall marginTop="scale1200" marginBottom="scale400">
            Chart
          </HeadingSmall>
          <Card
            overrides={{
              Root: {
                style: ({$theme}) => ({
                  borderRadius: '0',
                  ...$theme.borders.border200,
                }),
              },
              Body: {
                style: {
                  marginBottom: 0,
                },
              },
            }}
          >
            <Chart pid={pid} />
          </Card>

          <HeadingSmall marginTop="scale1200" marginBottom="scale400">
            Withdraw Queue
          </HeadingSmall>
          <Card
            overrides={{
              Root: {
                style: ({$theme}) => ({
                  borderRadius: '0',
                  ...$theme.borders.border200,
                }),
              },
            }}
          >
            <WithdrawQueue
              stakePoolWithdrawals={stakePoolWithdrawals}
              isLoading={isLoading}
            />
          </Card>

          <HeadingSmall marginTop="scale1200" marginBottom="scale400">
            Workers
          </HeadingSmall>
          <Card
            overrides={{
              Root: {
                style: ({$theme}) => ({
                  borderRadius: '0',
                  ...$theme.borders.border200,
                }),
              },
            }}
          >
            <WorkerTableV2
              kind="stakePool"
              pid={pid ? Number(pid) : undefined}
              isOwner={isOwner}
            />
          </Card>
        </Block>
      </Block>

      <StakePoolModal
        stakePool={data?.findUniqueStakePools}
        onClose={closeModal}
        modalKey={modalKey}
      />
    </>
  )
}
