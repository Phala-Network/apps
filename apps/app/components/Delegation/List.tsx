import {subsquidClient} from '@/lib/graphql'
import {
  BasePoolKind,
  DelegationOrderByInput,
  DelegationWhereInput,
  useInfiniteDelegationsConnectionQuery,
} from '@/lib/subsquid'
import {FilterList, Search} from '@mui/icons-material'
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  MenuItem,
  Skeleton,
  Stack,
  SxProps,
  TextField,
  Typography,
} from '@mui/material'
import {isTruthy} from '@phala/util'
import {debounce} from 'lodash-es'
import {FC, useCallback, useState} from 'react'

const orderByEntries: [string, DelegationOrderByInput][] = [
  ['Value high to low', DelegationOrderByInput.ValueDesc],
  ['Value low to high', DelegationOrderByInput.ValueAsc],
  ['Pid Asc', DelegationOrderByInput.BasePoolIdAsc],
  ['Pid Desc', DelegationOrderByInput.BasePoolIdDesc],
]

const skeleton = [...Array(3)].map((_, index) => (
  <Skeleton variant="rectangular" key={index} height={101} />
))

const DelegationList: FC<{
  address?: string
  isVault?: boolean
  sx?: SxProps
}> = ({address, isVault = false, sx}) => {
  const [orderBy, setOrderBy] = useState(DelegationOrderByInput.ValueDesc)
  const color = isVault ? 'secondary' : 'primary'
  const [vaultFilter, setVaultFilter] = useState(true)
  const [stakePoolFilter, setStakePoolFilter] = useState(true)
  const [withdrawingFilter, setWithdrawingFilterFilter] = useState(false)

  const [searchString, setSearchString] = useState('')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetSearchString = useCallback(
    debounce(setSearchString, 500),
    []
  )
  const where: Array<DelegationWhereInput | false> = [
    {account: {id_eq: address}},
    !!searchString && {
      OR: [{basePool: {id_contains: searchString}}],
    },
    (vaultFilter || stakePoolFilter) && {
      basePool: {
        kind_in: [
          vaultFilter && BasePoolKind.Vault,
          stakePoolFilter && BasePoolKind.StakePool,
        ].filter(isTruthy),
      },
    },
  ]
  const {data, isLoading} = useInfiniteDelegationsConnectionQuery(
    'after',
    subsquidClient,
    {first: 10, orderBy, where: {AND: where.filter(isTruthy)}},
    {
      keepPreviousData: true,
      enabled: !!address,
      getNextPageParam: (lastPage) =>
        lastPage.delegationsConnection.pageInfo.endCursor,
    }
  )

  const filters = (
    <Stack spacing={2}>
      <Typography variant="h5" component="div">
        Type
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            color={color}
            checked={vaultFilter}
            onChange={(e) => setVaultFilter(e.target.checked)}
          />
        }
        label="Vault"
      />
      <FormControlLabel
        control={
          <Checkbox
            color={color}
            checked={stakePoolFilter}
            onChange={(e) => setStakePoolFilter(e.target.checked)}
          />
        }
        label="Stake Pool"
      />
      <Typography variant="h5" component="div">
        Status
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            color={color}
            checked={withdrawingFilter}
            onChange={(e) => setWithdrawingFilterFilter(e.target.checked)}
          />
        }
        label="Withdrawing"
      />
      <Typography variant="h5" component="div">
        Property
      </Typography>
    </Stack>
  )

  return (
    <Stack direction="row" sx={sx}>
      <Box width={256} display={{xs: 'none', xl: 'block'}}>
        {filters}
      </Box>
      <Box flex="1 0">
        <Stack direction="row" spacing={{xs: 1, md: 2}} ml={{xs: 0, xl: -2}}>
          <IconButton
            sx={{
              display: {
                xs: 'block',
                xl: 'none',
              },
            }}
          >
            <FilterList />
          </IconButton>
          <TextField
            color={color}
            placeholder="Search Pid"
            size="small"
            InputProps={{endAdornment: <Search />}}
            onChange={(e) => debouncedSetSearchString(e.target.value)}
            sx={{flex: '1 0'}}
          />
          <TextField
            color={color}
            size="small"
            select
            sx={{width: 180}}
            value={orderBy}
            onChange={(e) => {
              setOrderBy(e.target.value as DelegationOrderByInput)
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
          {isLoading
            ? skeleton
            : data?.pages.map((page, index) => (
                <Stack key={index} spacing={2}>
                  {page.delegationsConnection.edges.map((edge) => edge.node.id)}
                </Stack>
              ))}
        </Stack>
      </Box>
    </Stack>
  )
}

export default DelegationList
