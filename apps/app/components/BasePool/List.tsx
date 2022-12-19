import Empty from '@/components/Empty'
import ListSkeleton from '@/components/ListSkeleton'
import useDebounced from '@/hooks/useDebounced'
import useGetAprMultiplier from '@/hooks/useGetAprMultiplier'
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
import {barlow} from '@/lib/theme'
import {
  basePoolMinAprAtom,
  basePoolMinDelegableAtom,
  basePoolMinTvlAtom,
  favoritePoolsAtom,
} from '@/store/common'
import FilterList from '@mui/icons-material/FilterList'
import Search from '@mui/icons-material/Search'
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Drawer,
  FormControlLabel,
  IconButton,
  MenuItem,
  NoSsr,
  Stack,
  SxProps,
  TextField,
  Typography,
} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {getDecimalPattern, isTruthy} from '@phala/util'
import {useAtom} from 'jotai'
import dynamic from 'next/dynamic'
import {FC, useCallback, useEffect, useState} from 'react'
import {useInView} from 'react-intersection-observer'
import DelegateCard from './DelegateCard'
import FarmCard from './FarmCard'

const OwnerSettings = dynamic(() => import('./OwnerSettings'))
const ClaimReward = dynamic(() => import('./ClaimReward'))
const ClaimDelegation = dynamic(() => import('./ClaimDelegation'))

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
  ['PID small to large', 'pid_ASC'],
  ['PID large to small', 'pid_DESC'],
]

const stakePoolOrderByEntries: OrderByEntries = [
  ['APR high to low', 'aprMultiplier_DESC'],
  ['APR low to high', 'aprMultiplier_ASC'],
  ...commonOrderByEntries,
]

const vaultOrderByEntries: OrderByEntries = [
  ['TVL high to low', 'totalValue_DESC'],
  ['TVL low to high', 'totalValue_ASC'],
  ...commonOrderByEntries,
  ['APY high to low', 'aprMultiplier_DESC'],
  ['APY low to high', 'aprMultiplier_ASC'],
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
  const getAprMultiplier = useGetAprMultiplier()
  const delegatorAddress =
    selectedVaultState === null
      ? polkadotAccount?.address
      : selectedVaultState?.account.id
  const isVault = kind === 'Vault'
  const [favoritePools] = useAtom(favoritePoolsAtom)
  const color = isVault ? 'secondary' : 'primary'
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [verifiedFilter, setVerifiedFilter] = useState(false)
  const [favoriteFilter, setFavoriteFilter] = useState(false)
  const [delegatedFilter, setDelegatedFilter] = useState(false)
  const [hideClosedFilter, setHideClosedFilter] = useState(true)
  const [stakePoolOrderBy, setStakePoolOrderBy] =
    useState<BasePoolOrderByInput>(
      variant === 'farm' ? 'pid_ASC' : 'aprMultiplier_DESC'
    )
  const [vaultOrderBy, setVaultOrderBy] = useState<BasePoolOrderByInput>(
    variant === 'farm' ? 'pid_ASC' : 'totalValue_DESC'
  )
  const [searchString, setSearchString] = useState('')
  const isSearchingPid = /^[0-9]+$/.test(searchString)
  const debouncedSearchString = useDebounced(searchString, 500)
  const [minDelegable, setMinDelegable] = useAtom(basePoolMinDelegableAtom)
  const debouncedMinDelegable = useDebounced(minDelegable, 500)
  const [minTvl, setMinTvl] = useAtom(basePoolMinTvlAtom)
  const debouncedMinTvl = useDebounced(minTvl, 500)
  const [minApr, setMinApr] = useAtom(basePoolMinAprAtom)
  const debouncedMinApr = useDebounced(getAprMultiplier(minApr), 500)
  const [minApy, setMinApy] = useAtom(basePoolMinAprAtom)
  const debouncedMinApy = useDebounced(getAprMultiplier(minApy), 500)
  const orderByEntries = isVault ? vaultOrderByEntries : stakePoolOrderByEntries
  const orderBy = isVault ? vaultOrderBy : stakePoolOrderBy
  const where: Array<BasePoolWhereInput | false> = [
    {kind_eq: kind},
    !!debouncedSearchString &&
      (isSearchingPid
        ? {id_startsWith: debouncedSearchString}
        : {
            OR: [
              {owner: {id_containsInsensitive: debouncedSearchString}},
              {
                owner: {
                  identityDisplay_containsInsensitive: debouncedSearchString,
                },
              },
            ],
          }),
    variant === 'farm' && {owner: {id_eq: polkadotAccount?.address}},
    verifiedFilter && {
      owner: {
        identityLevel_in: [IdentityLevel.KnownGood, IdentityLevel.Reasonable],
      },
    },
    favoriteFilter && {id_in: favoritePools},
    hideClosedFilter &&
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
      kind === 'StakePool' &&
      !!debouncedMinDelegable && {
        stakePool: {
          OR: [
            {delegable_gte: debouncedMinDelegable},
            {delegable_isNull: true},
          ],
        },
      },
    variant === 'delegate' &&
      !!debouncedMinTvl && {
        totalValue_gte: debouncedMinTvl,
      },
    variant === 'delegate' &&
      kind === 'StakePool' &&
      !!debouncedMinApr && {
        aprMultiplier_gte: debouncedMinApr.toDP(2).toString(),
      },
    variant === 'delegate' &&
      kind === 'Vault' &&
      !!debouncedMinApy && {
        aprMultiplier_gte: debouncedMinApy.toDP(2).toString(),
      },
  ]
  const enabled =
    variant === 'delegate' || (!!polkadotAccount?.address && variant === 'farm')
  const {data, isLoading, fetchNextPage, hasNextPage} =
    useInfiniteBasePoolsConnectionQuery(
      'after',
      subsquidClient,
      {
        first: 20,
        orderBy,
        where: {AND: where.filter(isTruthy)},
        accountId: polkadotAccount?.address,
      },
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

  const clearFilters = () => {
    setVerifiedFilter(false)
    setFavoriteFilter(false)
    setDelegatedFilter(false)
    setHideClosedFilter(false)
    if (kind === 'StakePool') {
      setMinDelegable('')
      setMinApr('')
    } else {
      setMinApy('')
    }
    setMinTvl('')
  }

  const canClearFilters =
    verifiedFilter ||
    favoriteFilter ||
    delegatedFilter ||
    hideClosedFilter ||
    (kind === 'StakePool' && minDelegable !== '') ||
    minTvl !== '' ||
    (kind === 'StakePool' && minApr !== '') ||
    (kind === 'Vault' && minApy !== '')

  const filters = variant === 'delegate' && (
    <Stack spacing={2} pr={5}>
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
            checked={hideClosedFilter}
            onChange={(e) => setHideClosedFilter(e.target.checked)}
          />
        }
        label="Hide closed"
      />
      <Typography variant="h5" component="div">
        Property
      </Typography>
      <NoSsr>
        <Stack spacing={3} pt={2}>
          {kind === 'StakePool' && (
            <TextField
              color={color}
              value={minDelegable}
              placeholder="0.00"
              label="Min Delegable"
              size="small"
              InputProps={{
                endAdornment: 'PHA',
                sx: {fontFamily: barlow.style.fontFamily, fontWeight: 600},
              }}
              inputProps={{inputMode: 'decimal', pattern: getDecimalPattern(2)}}
              onChange={(e) => {
                if (!e.target.validity.patternMismatch) {
                  setMinDelegable(e.target.value)
                }
              }}
            />
          )}
          <TextField
            color={color}
            value={minTvl}
            label="Min TVL"
            placeholder="0.00"
            size="small"
            InputProps={{
              endAdornment: 'PHA',
              sx: {fontFamily: barlow.style.fontFamily, fontWeight: 600},
            }}
            inputProps={{inputMode: 'decimal', pattern: getDecimalPattern(2)}}
            onChange={(e) => {
              if (!e.target.validity.patternMismatch) {
                setMinTvl(e.target.value)
              }
            }}
          />
          {kind === 'StakePool' && (
            <TextField
              color={color}
              value={minApr}
              label="Min APR"
              size="small"
              placeholder="0.00"
              InputProps={{
                endAdornment: '%',
                sx: {fontFamily: barlow.style.fontFamily, fontWeight: 600},
              }}
              inputProps={{inputMode: 'decimal', pattern: getDecimalPattern(2)}}
              onChange={(e) => {
                if (!e.target.validity.patternMismatch) {
                  setMinApr(e.target.value)
                }
              }}
            />
          )}
          {kind === 'Vault' && (
            <TextField
              color={color}
              value={minApy}
              label="Min APY"
              size="small"
              placeholder="0.00"
              InputProps={{
                endAdornment: '%',
                sx: {fontFamily: barlow.style.fontFamily, fontWeight: 600},
              }}
              inputProps={{inputMode: 'decimal', pattern: getDecimalPattern(2)}}
              onChange={(e) => {
                if (!e.target.validity.patternMismatch) {
                  setMinApy(e.target.value)
                }
              }}
            />
          )}
          <Button
            onClick={clearFilters}
            disabled={!canClearFilters}
            color={color}
          >
            Clear Filters
          </Button>
        </Stack>
      </NoSsr>
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
              onClick={() => setDrawerOpen(true)}
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
                variant === 'farm' ? 'Search PID' : 'Search PID or Owner'
              }
              size="small"
              value={searchString}
              InputProps={{endAdornment: <Search />}}
              onChange={(e) => setSearchString(e.target.value)}
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
      {variant === 'delegate' && (
        <Drawer
          PaperProps={{sx: {pt: 3, pl: 3}}}
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          {filters}
        </Drawer>
      )}
    </>
  )
}

export default BasePoolList
