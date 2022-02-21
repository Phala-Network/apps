import {usePolkadotAccountAtom} from '@phala/app-store'
import {formatCurrency, toFixed, trimAddress} from '@phala/utils'
import {Block} from 'baseui/block'
import {Button} from 'baseui/button'
import {Card} from 'baseui/card'
import {Skeleton} from 'baseui/skeleton'
import {TableBuilder, TableBuilderColumn} from 'baseui/table-semantic'
import {HeadingSmall, HeadingXLarge, HeadingXSmall} from 'baseui/typography'
import {formatDuration, intervalToDuration, isAfter} from 'date-fns'
import Decimal from 'decimal.js'
import {PageProps} from 'gatsby'
import {FC, ReactNode, useCallback, useState} from 'react'
import {Settings} from 'react-feather'
import Helmet from 'react-helmet'
import StakePoolModal, {StakePoolModalKey} from '../components/StakePoolModal'
import TableSkeleton from '../components/TableSkeleton'
import {StakePoolWithdrawals, useStakePoolQuery} from '../hooks/graphql'
import {client} from '../utils/GraphQLClient'

const DataCard: FC<{label: string; action?: ReactNode}> = ({
  label,
  action,
  children,
}) => {
  return (
    <Card
      overrides={{
        Root: {
          style: () => ({
            borderRadius: '0',
            borderWidth: '1px',
          }),
        },
        Body: {
          style: ({$theme}) => ({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: $theme.sizing.scale2400,
          }),
        },
      }}
    >
      <Block display="flex">
        <Block flex="1">
          {children === undefined ? (
            <>
              <Skeleton animation height="32px" width="100%" />
            </>
          ) : typeof children === 'string' || typeof children === 'number' ? (
            <HeadingXSmall as="div">{children}</HeadingXSmall>
          ) : (
            children
          )}
        </Block>
        {action && <Block>{action}</Block>}
      </Block>
      <Block color="contentSecondary">{label}</Block>
    </Card>
  )
}

export const StakePool = ({params: {pid}}: PageProps) => {
  const [modalKey, setModalKey] = useState<StakePoolModalKey | null>(null)
  const [polkadotAccount] = usePolkadotAccountAtom()
  const {data, isLoading} = useStakePoolQuery(client, {
    where: {
      pid: Number(pid),
    },
  })

  const {
    stakePoolWithdrawals,
    instantApr,
    commission,
    remainingStake,
    ownerAddress,
  } = data?.findUniqueStakePools || {}

  const isOwner = ownerAddress === polkadotAccount?.address

  const closeModal = useCallback(() => {
    setModalKey(null)
  }, [])

  return (
    <>
      <Helmet>
        <title>Stake Pool #{pid}</title>
      </Helmet>

      <Block>
        <Block
          display="flex"
          justifyContent="space-between"
          paddingTop="scale1200"
          paddingLeft="scale400"
          paddingRight="scale400"
          paddingBottom="scale1200"
          maxWidth="1024px"
          margin="0 auto"
        >
          <HeadingXLarge as="div">Stake Pool #{pid}</HeadingXLarge>

          <Button onClick={() => setModalKey('delegate')}>Delegate</Button>
        </Block>
      </Block>

      <Block maxWidth="1024px" margin="0 auto">
        <Block
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          gridGap="scale400"
        >
          {/* <DataCard label="Owner"></DataCard> */}
          <DataCard label="APR">
            {instantApr && `${toFixed(new Decimal(instantApr).times(100), 2)}%`}
          </DataCard>
          <DataCard label="Remaining">
            {remainingStake && `${formatCurrency(remainingStake)} PHA`}
          </DataCard>
          <DataCard
            label="Commission"
            action={
              isOwner && (
                <Button
                  kind="minimal"
                  size="mini"
                  shape="circle"
                  onClick={() => setModalKey('setCommission')}
                >
                  <Settings size={16} />
                </Button>
              )
            }
          >
            {commission && `${toFixed(new Decimal(commission).times(100), 2)}%`}
          </DataCard>
        </Block>

        <HeadingSmall marginTop="scale800" marginBottom="scale600">
          Stake Info
        </HeadingSmall>
        <Card
          overrides={{
            Root: {
              style: ({$theme}) => ({
                borderRadius: '0',
                borderWidth: '1px',
                marginTop: $theme.sizing.scale800,
              }),
            },
            Body: {
              style: {
                display: 'flex',
              },
            },
          }}
        >
          <Block></Block>
          <Block></Block>
        </Card>

        <HeadingSmall marginTop="scale800" marginBottom="scale600">
          Withdraw Queue
        </HeadingSmall>
        <Card
          overrides={{
            Root: {
              style: {
                borderRadius: '0',
                borderWidth: '1px',
              },
            },
          }}
        >
          <TableBuilder
            isLoading={isLoading}
            loadingMessage={<TableSkeleton />}
            data={stakePoolWithdrawals || []}
            emptyMessage="No Results"
            overrides={{
              TableBodyCell: {
                style: {
                  whiteSpace: 'nowrap',
                },
              },
              TableHeadCellSortable: {
                style: {
                  svg: {
                    right: 'initial',
                  },
                },
              },
              TableLoadingMessage: {
                style: {
                  padding: '10px 0',
                },
              },
            }}
          >
            <TableBuilderColumn header="Delegator">
              {({userAddress}: StakePoolWithdrawals) =>
                userAddress && trimAddress(userAddress)
              }
            </TableBuilderColumn>
            <TableBuilderColumn header="Delegation">
              {({stake}: StakePoolWithdrawals) =>
                `${formatCurrency(stake)} PHA`
              }
            </TableBuilderColumn>
            <TableBuilderColumn header="Countdown">
              {({estimatesEndTime}: StakePoolWithdrawals) => {
                const start = new Date()
                const end = new Date(estimatesEndTime)
                return formatDuration(
                  intervalToDuration({
                    start,
                    end: isAfter(end, start) ? end : start,
                  }),
                  {format: ['days', 'hours', 'minutes'], zero: true}
                )
              }}
            </TableBuilderColumn>
          </TableBuilder>
        </Card>
      </Block>

      <StakePoolModal
        stakePool={data?.findUniqueStakePools}
        onClose={closeModal}
        modalKey={modalKey}
      />
    </>
  )
}
