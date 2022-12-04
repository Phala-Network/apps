import ListSkeleton from '@/components/ListSkeleton'
import useSelectedVaultState from '@/hooks/useSelectedVaultState'
import {subsquidClient} from '@/lib/graphql'
import {
  BasePoolKind,
  BasePoolOrderByInput,
  BasePoolWhereInput,
  IdentityLevel,
  useInfiniteBasePoolsConnectionQuery,
} from '@/lib/subsquidQuery'
import {favoritePoolsAtom} from '@/store/common'
import {FilterList, Search} from '@mui/icons-material'
import {
  Box,
  Checkbox,
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
import {FC, useCallback, useState} from 'react'
import DelegateCard from './DelegateCard'
import FarmCard from './FarmCard'

type BasePoolListVariant = 'farm' | 'delegate'
type OrderByEntries = [string, BasePoolOrderByInput][]

const commonOrderByEntries: OrderByEntries = [
  ['Pid Asc', BasePoolOrderByInput.PidAsc],
  ['Pid Desc', BasePoolOrderByInput.PidDesc],
]

const stakePoolOrderByEntries: OrderByEntries = [
  ['APR high to low', BasePoolOrderByInput.AprMultiplierDesc],
  ['APR low to high', BasePoolOrderByInput.AprMultiplierDesc],
  ...commonOrderByEntries,
]

const vaultOrderByEntries: OrderByEntries = [
  ['TVL high to low', BasePoolOrderByInput.TotalValueDesc],
  ['TVL low to high', BasePoolOrderByInput.TotalValueAsc],
  ...commonOrderByEntries,
  ['APY high to low', BasePoolOrderByInput.AprMultiplierDesc],
  ['APY low to high', BasePoolOrderByInput.AprMultiplierDesc],
]

const BasePoolList: FC<{
  variant: BasePoolListVariant
  kind: BasePoolKind
  sx?: SxProps
}> = ({variant, kind, sx}) => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetSearchString = useCallback(
    debounce(setSearchString, 500),
    []
  )
  const orderByEntries = isVault ? vaultOrderByEntries : stakePoolOrderByEntries
  const orderBy = isVault ? vaultOrderBy : stakePoolOrderBy
  const where: Array<BasePoolWhereInput | false> = [
    {kind_eq: kind},
    !!searchString && {
      OR: [
        {id_eq: searchString},
        {owner: {id_containsInsensitive: searchString}},
        {owner: {identityDisplay_containsInsensitive: searchString}},
      ],
    },
    variant === 'farm' && {owner: {id_eq: polkadotAccount?.address}},
    verifiedFilter && {
      owner: {
        identityLevel_in: [IdentityLevel.KnownGood, IdentityLevel.Reasonable],
      },
    },
    favoriteFilter && {id_in: favoritePools},
    !closedFilter && {
      OR: [
        {owner: {id_eq: delegatorAddress}},
        {whitelistEnabled_eq: false},
        {whitelists_some: {id_eq: delegatorAddress}},
      ],
    },
    delegatedFilter && {
      delegations_some: {account: {id_eq: delegatorAddress}, shares_gt: '0'},
    },
  ]
  const {data, isLoading} = useInfiniteBasePoolsConnectionQuery(
    'after',
    subsquidClient,
    {first: 99, orderBy, where: {AND: where.filter(isTruthy)}},
    {
      keepPreviousData: true,
      enabled: Boolean(delegatorAddress),
      getNextPageParam: (lastPage) =>
        lastPage.basePoolsConnection.pageInfo.endCursor,
    }
  )

  const filters = variant === 'delegate' && (
    <Stack spacing={2}>
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
          {isLoading ? (
            <ListSkeleton height={101} />
          ) : (
            data?.pages.map((page, index) => (
              <Stack key={index} spacing={2}>
                {page.basePoolsConnection.edges.map((edge) =>
                  variant === 'farm' ? (
                    <FarmCard key={edge.node.id} basePool={edge.node} />
                  ) : (
                    <DelegateCard key={edge.node.id} basePool={edge.node} />
                  )
                )}
              </Stack>
            ))
          )}
        </Stack>
      </Box>
    </Stack>
  )
}

export default BasePoolList
