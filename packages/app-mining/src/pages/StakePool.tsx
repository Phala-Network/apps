import {formatCurrency, trimAddress} from '@phala/utils'
import {Block} from 'baseui/block'
import {Card} from 'baseui/card'
// import {StyledLink} from 'baseui/link'
// import {Skeleton} from 'baseui/skeleton'
import {TableBuilder, TableBuilderColumn} from 'baseui/table-semantic'
import {HeadingSmall, HeadingXLarge} from 'baseui/typography'
import {formatDuration, intervalToDuration, isAfter} from 'date-fns'
import {PageProps} from 'gatsby'
import Helmet from 'react-helmet'
// import {VerifiedIcon} from '../components/Owner'
import TableSkeleton from '../components/TableSkeleton'
import {StakePoolWithdrawals, useStakePoolQuery} from '../hooks/graphql'
import {client} from '../utils/GraphQLClient'

export const StakePool = ({params: {pid}}: PageProps) => {
  const {data, isLoading} = useStakePoolQuery(client, {
    where: {
      pid: Number(pid),
    },
  })

  const {
    // ownerAddress,
    // accounts: {identityVerified = false, identity = null} = {},
    stakePoolWithdrawals,
  } = data?.findUniqueStakePools || {}

  return (
    <>
      <Helmet>
        <title>Stake Pool #{pid}</title>
      </Helmet>

      <Block>
        <Block
          paddingTop="scale1200"
          paddingLeft="scale400"
          paddingRight="scale400"
          maxWidth="1024px"
          margin="0 auto"
        >
          <HeadingXLarge as="div">Stake Pool #{pid}</HeadingXLarge>
        </Block>
      </Block>

      <Block maxWidth="1024px" margin="0 auto">
        {/* <Card>
          <HeadingSmall as="div">Owner</HeadingSmall>
          <Block>
            {ownerAddress ? (
              <>
                {identity && (
                  <Block display="inline-flex" alignItems="center">
                    {identity}
                    {identityVerified && <VerifiedIcon />}
                  </Block>
                )}
                <StyledLink
                  href={`https://khala.subscan.io/account/${ownerAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ownerAddress}
                </StyledLink>
              </>
            ) : (
              <Skeleton animation />
            )}
          </Block>
        </Card> */}

        <Card
          overrides={{
            Root: {
              style: ({$theme}) => ({
                borderRadius: '0',
                border: 'none',
                boxShadow: $theme.lighting.shallowBelow,
                marginTop: $theme.sizing.scale950,
              }),
            },
          }}
        >
          <HeadingSmall as="div">Withdraw Queue</HeadingSmall>
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
    </>
  )
}
