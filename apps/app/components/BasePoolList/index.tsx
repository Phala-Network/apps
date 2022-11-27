import {subsquidClient} from '@/lib/graphql'
import {
  BasePoolKind,
  BasePoolOrderByInput,
  useInfiniteBasePoolsConnectionQuery,
} from '@/lib/subsquid'
import {Search} from '@mui/icons-material'
import {MenuItem, Skeleton, Stack, TextField} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {useAtom} from 'jotai'
import {FC, useState} from 'react'
import FarmCard from './FarmCard'

type BasePoolListVariant = 'farm' | 'delegate'
type OrderByEntries = [string, BasePoolOrderByInput][]

const commonOrderByEntries: OrderByEntries = [
  ['Pid Asc', BasePoolOrderByInput.PidAsc],
  ['Pid Desc', BasePoolOrderByInput.PidDesc],
]

const stakePoolOrderByEntries: OrderByEntries = [
  ...commonOrderByEntries,
  ['APR high to low', BasePoolOrderByInput.StakePoolAprMultiplierDesc],
  ['APR low to high', BasePoolOrderByInput.StakePoolAprMultiplierAsc],
]

const vaultOrderByEntries: OrderByEntries = [
  ...commonOrderByEntries,
  ['APY high to low', BasePoolOrderByInput.VaultAprDesc],
  ['APY low to high', BasePoolOrderByInput.VaultAprAsc],
]

const getDefaultOrderBy = (
  variant: BasePoolListVariant,
  kind: BasePoolKind
): BasePoolOrderByInput => {
  if (variant === 'delegate') {
    if (kind === BasePoolKind.StakePool) {
      return BasePoolOrderByInput.StakePoolAprMultiplierDesc
    }
    return BasePoolOrderByInput.VaultAprDesc
  }
  return BasePoolOrderByInput.PidAsc
}

const skeleton = [...Array(3)].map((_, index) => (
  <Skeleton variant="rectangular" key={index} height={101} animation="wave" />
))

const BasePoolList: FC<{
  variant: BasePoolListVariant
  kind: BasePoolKind
}> = ({variant, kind}) => {
  const [orderBy, setOrderBy] = useState<BasePoolOrderByInput>(() =>
    getDefaultOrderBy(variant, kind)
  )
  const [searchString, setSearchString] = useState('')
  const [polkadotAccount] = useAtom(polkadotAccountAtom)
  const orderByEntries =
    kind === BasePoolKind.StakePool
      ? stakePoolOrderByEntries
      : vaultOrderByEntries
  const {data, isLoading} = useInfiniteBasePoolsConnectionQuery(
    'after',
    subsquidClient,
    {
      first: 10,
      orderBy,
      where: {
        kind_eq: kind,
        ...(searchString && {OR: [{id_eq: searchString}]}),
        ...(variant === 'farm' && {owner: {id_eq: polkadotAccount?.address}}),
      },
    },
    {
      keepPreviousData: true,
      enabled: Boolean(polkadotAccount?.address),
      getNextPageParam: (lastPage) =>
        lastPage.basePoolsConnection.pageInfo.endCursor,
    }
  )

  return (
    <>
      <Stack direction="row" spacing={{xs: 1, md: 2}}>
        <TextField
          placeholder="Search By Pid"
          value={searchString}
          size="small"
          InputProps={{endAdornment: <Search />}}
          onChange={(e) => setSearchString(e.target.value)}
          sx={{flex: '1 0'}}
        />
        <TextField
          size="small"
          select
          sx={{width: 180}}
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value as BasePoolOrderByInput)}
        >
          {orderByEntries.map(([label, value]) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <Stack spacing={2} mt={2}>
        {isLoading
          ? skeleton
          : data?.pages.map((page, index) => (
              <Stack key={index} spacing={2}>
                {page.basePoolsConnection.edges.map(
                  (edge) =>
                    variant === 'farm' && (
                      <FarmCard key={edge.node.id} basePool={edge.node} />
                    )
                )}
              </Stack>
            ))}
      </Stack>
    </>
  )
}

export default BasePoolList
