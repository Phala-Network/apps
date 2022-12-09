import Empty from '@/components/Empty'
import ListSkeleton from '@/components/ListSkeleton'
import useSelectedVaultState from '@/hooks/useSelectedVaultState'
import {subsquidClient} from '@/lib/graphql'
import {
  BasePoolCommonFragment,
  BasePoolKind,
  BasePoolOrderByInput,
  BasePoolWhereInput,
  IdentityLevel,
  useInfiniteBasePoolsConnectionQuery,
} from '@/lib/subsquidQuery'
import {favoritePoolsAtom} from '@/store/common'
import FilterList from '@mui/icons-material/FilterList'
import Search from '@mui/icons-material/Search'
import {
  Box,
  Checkbox,
  Dialog,
  FormControlLabel,
  IconButton,
  MenuItem,
  Stack,
  SxProps,
  TextField,
  Typography,
} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {isTruthy} from '@phala/util'
import {useAtom} from 'jotai'
import {debounce} from 'lodash-es'
import dynamic from 'next/dynamic'
import {FC, useCallback, useEffect, useState} from 'react'
import {useInView} from 'react-intersection-observer'
import DelegateCard from './DelegateCard'
import FarmCard from './FarmCard'

const OwnerSettings = dynamic(() => import('./OwnerSettings'), {
  ssr: false,
})
const ClaimReward = dynamic(() => import('./ClaimReward'), {
  ssr: false,
})
const ClaimDelegation = dynamic(() => import('./ClaimDelegation'), {
  ssr: false,
})

type BasePoolListVariant = 'farm' | 'delegate'
type OrderByEntries = [string, BasePoolOrderByInput][]
export type PoolDialogAction =
  | 'ownerSettings'
  | 'claimReward'
  | 'claimDelegation'
export type OnAction = (
  basePool: BasePoolCommonFragment,
  action: PoolDialogAction
) => void

const commonOrderByEntries: OrderByEntries = [
  ['Pid Asc', BasePoolOrderByInput.PidAsc],
  ['Pid Desc', BasePoolOrderByInput.PidDesc],
]

const stakePoolOrderByEntries: OrderByEntries = [
  ['APR high to low', BasePoolOrderByInput.AprMultiplierDesc],
  ['APR low to high', BasePoolOrderByInput.AprMultiplierAsc],
  ...commonOrderByEntries,
]

const vaultOrderByEntries: OrderByEntries = [
  ['TVL high to low', BasePoolOrderByInput.TotalValueDesc],
  ['TVL low to high', BasePoolOrderByInput.TotalValueAsc],
  ...commonOrderByEntries,
  ['APY high to low', BasePoolOrderByInput.AprMultiplierDesc],
  ['APY low to high', BasePoolOrderByInput.AprMultiplierAsc],
]

const BasePoolList: FC<{
  variant: BasePoolListVariant
  kind: BasePoolKind
  sx?: SxProps
}> = ({variant, kind, sx}) => {
  const {ref, inView} = useInView()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [operatingPool, setOperatingPool] = useState<BasePoolCommonFragment>()
  const [dialogAction, setDialogAction] = useState<PoolDialogAction>()
  const [polkadotAccount] = useAtom(polkadotAccountAtom)
  const selectedVaultState = useSelectedVaultState()
  const delegatorAddress =
    selectedVaultState === null
      ? polkadotAccount?.address
      : selectedVaultState?.account.id
  const isVault = kind === 'Vault'
  const [favoritePools] = useAtom(favoritePoolsAtom)
  const color = isVault ? 'secondary' : 'primary'
  const [verifiedFilter, setVerifiedFilter] = useState(false)
  const [favoriteFilter, setFavoriteFilter] = useState(false)
  const [delegatedFilter, setDelegatedFilter] = useState(false)
  const [closedFilter, setClosedFilter] = useState(false)
  const [stakePoolOrderBy, setStakePoolOrderBy] =
    useState<BasePoolOrderByInput>(
      variant === 'farm'
        ? BasePoolOrderByInput.PidAsc
        : BasePoolOrderByInput.AprMultiplierDesc
    )
  const [vaultOrderBy, setVaultOrderBy] = useState<BasePoolOrderByInput>(
    variant === 'farm'
      ? BasePoolOrderByInput.PidAsc
      : BasePoolOrderByInput.TotalValueDesc
  )
  const [searchString, setSearchString] = useState('')
  const isSearchingPid = /^[0-9]+$/.test(searchString)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetSearchString = useCallback(
    debounce(setSearchString, 500),
    []
  )
  const orderByEntries = isVault ? vaultOrderByEntries : stakePoolOrderByEntries
  const orderBy = isVault ? vaultOrderBy : stakePoolOrderBy
  const where: Array<BasePoolWhereInput | false> = [
    {kind_eq: kind},
    !!searchString &&
      (isSearchingPid
        ? {id_eq: searchString}
        : {
            OR: [
              {owner: {id_containsInsensitive: searchString}},
              {owner: {identityDisplay_containsInsensitive: searchString}},
            ],
          }),
    variant === 'farm' && {owner: {id_eq: polkadotAccount?.address}},
    verifiedFilter && {
      owner: {
        identityLevel_in: [IdentityLevel.KnownGood, IdentityLevel.Reasonable],
      },
    },
    favoriteFilter && {id_in: favoritePools},
    !closedFilter &&
      !!delegatorAddress && {
        OR: [
          {owner: {id_eq: delegatorAddress}},
          {whitelistEnabled_eq: false},
          {whitelists_some: {id_eq: delegatorAddress}},
        ],
      },
    delegatedFilter &&
      !!delegatorAddress && {
        delegations_some: {account: {id_eq: delegatorAddress}, shares_gt: '0'},
      },
    variant === 'delegate' &&
      kind === 'StakePool' && {stakePool: {delegable_gte: '100'}},
  ]
  const enabled =
    variant === 'delegate' || (!!polkadotAccount?.address && variant === 'farm')
  const {data, isLoading, fetchNextPage, hasNextPage} =
    useInfiniteBasePoolsConnectionQuery(
      'after',
      subsquidClient,
      {first: 20, orderBy, where: {AND: where.filter(isTruthy)}},
      {
        enabled,
        keepPreviousData: true,
        getNextPageParam: (lastPage) =>
          lastPage.basePoolsConnection.pageInfo.hasNextPage
            ? lastPage.basePoolsConnection.pageInfo.endCursor
            : undefined,
      }
    )
  const isEmpty = data?.pages[0].basePoolsConnection.totalCount === 0

  const onAction: OnAction = useCallback((basePool, action) => {
    setDialogOpen(true)
    setOperatingPool(basePool)
    setDialogAction(action)
  }, [])
  const onClose = useCallback(() => {
    setDialogOpen(false)
  }, [])

  useEffect(() => {
    if (inView && enabled) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, enabled])

  const filters = variant === 'delegate' && (
    <Stack spacing={2} pr={3}>
      <Typography variant="h5" component="div">
        Status
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            color={color}
            checked={verifiedFilter}
            onChange={(e) => setVerifiedFilter(e.target.checked)}
          />
        }
        label="Verified"
      />
      <FormControlLabel
        control={
          <Checkbox
            color={color}
            checked={favoriteFilter}
            onChange={(e) => setFavoriteFilter(e.target.checked)}
          />
        }
        label="Favorite"
      />
      <FormControlLabel
        control={
          <Checkbox
            color={color}
            checked={delegatedFilter}
            onChange={(e) => setDelegatedFilter(e.target.checked)}
          />
        }
        label="Delegated"
      />
      <FormControlLabel
        control={
          <Checkbox
            color={color}
            checked={closedFilter}
            onChange={(e) => setClosedFilter(e.target.checked)}
          />
        }
        label="Closed"
      />
      <Typography variant="h5" component="div">
        Property
      </Typography>
    </Stack>
  )

  return (
    <>
      <Stack direction="row" sx={sx} alignItems="flex-start" minHeight="100vh">
        {variant === 'delegate' && (
          <Box
            width={256}
            display={{xs: 'none', xl: 'block'}}
            position="sticky"
            top="80px"
          >
            {filters}
          </Box>
        )}
        <Box flex="1 0">
          <Stack direction="row" spacing={{xs: 1, md: 2}} alignItems="center">
            <IconButton
              sx={{
                display: {
                  xs: variant === 'delegate' ? undefined : 'none',
                  xl: 'none',
                },
              }}
            >
              <FilterList />
            </IconButton>
            <TextField
              color={color}
              placeholder={
                variant === 'farm' ? 'Search Pid' : 'Search Pid or Owner'
              }
              size="small"
              InputProps={{endAdornment: <Search />}}
              onChange={(e) => debouncedSetSearchString(e.target.value)}
              sx={{flex: '1 0', ml: {xl: '0!important'}}}
            />
            <TextField
              color={color}
              size="small"
              select
              sx={{width: 180}}
              value={orderBy}
              onChange={(e) => {
                if (isVault) {
                  setVaultOrderBy(e.target.value as BasePoolOrderByInput)
                } else {
                  setStakePoolOrderBy(e.target.value as BasePoolOrderByInput)
                }
              }}
            >
              {orderByEntries.map(([label, value]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack spacing={2} mt={2}>
            {isEmpty ? (
              <Empty sx={{minHeight: 400}} />
            ) : (
              data?.pages.map((page, index) => (
                <Stack key={index} spacing={2}>
                  {page.basePoolsConnection.edges.map((edge) =>
                    variant === 'farm' ? (
                      <FarmCard
                        key={edge.node.id}
                        basePool={edge.node}
                        onAction={onAction}
                      />
                    ) : (
                      <DelegateCard key={edge.node.id} basePool={edge.node} />
                    )
                  )}
                </Stack>
              ))
            )}

            {(isLoading || hasNextPage) && (
              <ListSkeleton ref={ref} height={100} />
            )}
          </Stack>
        </Box>
      </Stack>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        {operatingPool && (
          <>
            {dialogAction === 'ownerSettings' && (
              <OwnerSettings basePool={operatingPool} />
            )}
            {dialogAction === 'claimReward' && (
              <ClaimReward basePool={operatingPool} onClose={onClose} />
            )}
            {dialogAction === 'claimDelegation' && (
              <ClaimDelegation basePool={operatingPool} onClose={onClose} />
            )}
          </>
        )}
      </Dialog>
    </>
  )
}

export default BasePoolList
