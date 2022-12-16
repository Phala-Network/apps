import {useCurrentAccount} from '@phala/store'
import {toFixed, trimAddress} from '@phala/utils'
import {useStyletron} from 'baseui'
import {Block} from 'baseui/block'
import {Button} from 'baseui/button'
import {Card} from 'baseui/card'
import {StyledLink} from 'baseui/link'
import {StatefulTooltip} from 'baseui/tooltip'
import {HeadingLarge, HeadingSmall, ParagraphXSmall} from 'baseui/typography'
import Decimal from 'decimal.js'
import {PageProps} from 'gatsby'
import {FC, useCallback, useState} from 'react'
import {CheckCircle, Info, MinusCircle} from 'react-feather'
import styled from 'styled-components'
import Head from '../../components/Head'
import Chart from '../../components/StakePool/Chart'
import InfoCard from '../../components/StakePool/InfoCard'
import SettingButton from '../../components/StakePool/SettingButton'
import StakeInfo from '../../components/StakePool/StakeInfo'
import WithdrawQueue from '../../components/StakePool/WithdrawQueue'
import StakePoolDescription from '../../components/StakePoolDescription'
import StakePoolModal, {
  StakePoolModalKey,
} from '../../components/StakePoolModal'
import StakePoolWhitelist from '../../components/StakePoolWhitelist'
import WorkerTableV2 from '../../components/WorkerTableV2'
import {IdentityLevel, useStakePoolByIdQuery} from '../../hooks/subsquid'
import useAprCoefficient from '../../hooks/useAprCoefficient'
import {subsquidClient} from '../../lib/graphqlClient'

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

const StakePool: FC<StakePoolProps> = ({pid}) => {
  const [, theme] = useStyletron()
  const [modalKey, setModalKey] = useState<StakePoolModalKey | null>(null)
  const [polkadotAccount] = useCurrentAccount()
  const aprCoefficient = useAprCoefficient()
  const {data} = useStakePoolByIdQuery(
    subsquidClient,
    {
      stakePoolByIdId: pid as string,
      withWhitelist: true,
      accountId: polkadotAccount?.address,
    },
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      enabled: Boolean(pid),
    }
  )

  const closeModal = useCallback(() => {
    setModalKey(null)
  }, [])

  const stakePool = data?.stakePoolById

  const {commission, owner, activeStakeCount, workerCount, miningWorkerCount} =
    stakePool || {}

  const isOwner = Boolean(owner && owner.id === polkadotAccount?.address)
  const verified = Boolean(
    owner &&
      (owner.identityLevel === IdentityLevel.Reasonable ||
        owner.identityLevel === IdentityLevel.KnownGood)
  )
  return (
    <>
      <Head title={`Stake Pool #${pid}`}></Head>

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

          <Button disabled onClick={() => setModalKey('delegate')}>
            Delegate
          </Button>
        </Block>

        <Block maxWidth="1024px" margin="0 auto">
          <Block
            display="grid"
            gridTemplateColumns="2fr 1fr 1fr 1fr 1fr"
            gridGap="scale400"
            $style={{
              [theme.mediaQuery.medium]: {
                gridTemplateColumns: '1fr 1fr',
              },
            }}
          >
            <InfoCard
              label="Owner"
              extra={
                owner && (
                  <ParagraphXSmall as="div">
                    <StyledLink
                      href={`https://khala.subscan.io/account/${owner.id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {trimAddress(owner.id)}
                    </StyledLink>
                  </ParagraphXSmall>
                )
              }
            >
              {owner &&
                (owner.identityDisplay ? (
                  <>
                    {owner.identityDisplay}
                    {verified ? <VerifiedIcon /> : <UnVerifiedIcon />}
                  </>
                ) : (
                  trimAddress(owner.id)
                ))}
            </InfoCard>
            <InfoCard label="APR">
              {aprCoefficient &&
                stakePool?.aprBase &&
                `${toFixed(
                  aprCoefficient.times(stakePool.aprBase).times(100),
                  2
                )}%`}
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
                typeof miningWorkerCount === 'number' && (
                  <ParagraphXSmall as="div" color="contentSecondary">
                    {miningWorkerCount} Mining
                  </ParagraphXSmall>
                )
              }
            >
              {workerCount}
            </InfoCard>
            <InfoCard label="Delegator">{activeStakeCount}</InfoCard>
          </Block>

          <Block display="flex" alignItems="center" marginTop="scale800">
            <HeadingSmall marginTop="scale400" marginBottom="scale400">
              Intro
            </HeadingSmall>
            {isOwner && (
              <SettingButton onClick={() => setModalKey('setDescription')} />
            )}
          </Block>
          <Card
            overrides={{
              Root: {
                style: ({$theme}) => ({
                  borderRadius: '4px',
                  ...$theme.borders.border200,
                }),
              },
              Body: {
                style: ({$theme}) => ({
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
                  gap: $theme.sizing.scale800,
                  [$theme.mediaQuery.medium]: {
                    gridTemplateColumns: '1fr',
                  },
                }),
              },
            }}
          >
            <StakePoolDescription pid={pid} />
          </Card>

          <HeadingSmall marginTop="scale1200" marginBottom="scale400">
            Stake Info
          </HeadingSmall>
          <Card
            overrides={{
              Root: {
                style: ({$theme}) => ({
                  borderRadius: '4px',
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
                  borderRadius: '4px',
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
                  borderRadius: '4px',
                  ...$theme.borders.border200,
                }),
              },
            }}
          >
            <WithdrawQueue pid={pid} />
          </Card>

          <HeadingSmall marginTop="scale1200" marginBottom="scale400">
            Workers
          </HeadingSmall>
          <Card
            overrides={{
              Root: {
                style: ({$theme}) => ({
                  borderRadius: '4px',
                  ...$theme.borders.border200,
                }),
              },
            }}
          >
            <WorkerTableV2 kind="stakePool" pid={pid} isOwner={isOwner} />
          </Card>

          {isOwner && (
            <>
              <HeadingSmall marginTop="scale1200" marginBottom="scale400">
                Whitelist{' '}
                <StatefulTooltip
                  overrides={{Body: {style: {maxWidth: '400px'}}}}
                  content="When there is content in the whitelist, only addresses in the whitelist can delegate to the stake pool. When the whitelist is empty, there are no constraints.
In any case, the pool owner is not subject to any restrictions on the whitelist."
                >
                  <Info size={18} style={{marginLeft: 5}} />
                </StatefulTooltip>
              </HeadingSmall>
              <Card
                overrides={{
                  Root: {
                    style: ({$theme}) => ({
                      borderRadius: '4px',
                      ...$theme.borders.border200,
                    }),
                  },
                }}
              >
                <StakePoolWhitelist pid={pid} />
              </Card>
            </>
          )}
        </Block>
      </Block>

      <StakePoolModal
        stakePool={stakePool}
        onClose={closeModal}
        modalKey={modalKey}
      />
    </>
  )
}

export default StakePool
