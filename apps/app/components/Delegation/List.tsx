import NftsIcon from '@/assets/nfts.svg'
import Empty from '@/components/Empty'
import ListSkeleton from '@/components/ListSkeleton'
import SectionHeader from '@/components/SectionHeader'
import useDebounced from '@/hooks/useDebounced'
import {
  type BasePoolKind,
  type DelegationCommonFragment,
  type DelegationOrderByInput,
  type DelegationWhereInput,
  useInfiniteDelegationsConnectionQuery,
} from '@/lib/subsquidQuery'
import {subsquidClientAtom} from '@/store/common'
import FilterList from '@mui/icons-material/FilterList'
import FormatListBulleted from '@mui/icons-material/FormatListBulleted'
import GridView from '@mui/icons-material/GridView'
import Search from '@mui/icons-material/Search'
import {
  Box,
  Checkbox,
  Dialog,
  Drawer,
  FormControlLabel,
  Unstable_Grid2 as Grid,
  IconButton,
  MenuItem,
  NoSsr,
  Skeleton,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import {useAtom} from 'jotai'
import {type FC, useCallback, useEffect, useState} from 'react'
import {useInView} from 'react-intersection-observer'
import HorizonCard from './HorizonCard'
import NftCard from './NftCard'
import Withdraw from './Withdraw'

export type DelegationDialogAction = 'withdraw'
export type OnAction = (
  delegation: DelegationCommonFragment,
  action: DelegationDialogAction,
) => void

const orderByEntries: Array<[string, DelegationOrderByInput]> = [
  ['Value high to low', 'value_DESC'],
  ['Value low to high', 'value_ASC'],
  ['APR high to low', 'basePool_aprMultiplier_DESC'],
  ['APR low to high', 'basePool_aprMultiplier_ASC'],
  ['PID small to large', 'basePool_pid_ASC'],
  ['PID large to small', 'basePool_pid_DESC'],
  ['Most pool free', 'basePool_freeValue_DESC'],
]

const DelegationList: FC<{
  showHeader?: boolean
  address?: string
  isVault?: boolean
  isOwner?: boolean
}> = ({address, isVault = false, showHeader = false, isOwner = false}) => {
  const {ref, inView} = useInView()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogAction, setDialogAction] = useState<DelegationDialogAction>()
  const [operatingDelegation, setOperatingDelegation] =
    useState<DelegationCommonFragment>()
  const [showNftCard, setShowNftCard] = useState(true)
  const [orderBy, setOrderBy] = useState<DelegationOrderByInput>('value_DESC')
  const color = isVault ? 'secondary' : 'primary'
  const [vaultFilter, setVaultFilter] = useState(true)
  const [stakePoolFilter, setStakePoolFilter] = useState(true)
  const [withdrawingFilter, setWithdrawingFilterFilter] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchString, setSearchString] = useState('')
  const isSearchingPid = /^[0-9]+$/.test(searchString)
  const debouncedSearchString = useDebounced(searchString, 500)
  const where: Array<DelegationWhereInput | false> = [
    {account: {id_eq: address}},
    {shares_gt: '0'},
    debouncedSearchString !== '' &&
      (isSearchingPid
        ? {basePool: {id_startsWith: debouncedSearchString}}
        : {
            basePool: {
              owner: {
                OR: [
                  {id_containsInsensitive: debouncedSearchString},
                  {identityDisplay_containsInsensitive: debouncedSearchString},
                ],
              },
            },
          }),
    !isVault && {
      basePool: {
        kind_in: [
          vaultFilter && ('Vault' as BasePoolKind),
          stakePoolFilter && ('StakePool' as BasePoolKind),
        ].filter(Boolean),
      },
    },
    withdrawingFilter && {withdrawingValue_gt: '0'},
  ]
  const enabled = address !== undefined
  const [subsquidClient] = useAtom(subsquidClientAtom)
  const {data, isLoading, fetchNextPage, hasNextPage} =
    useInfiniteDelegationsConnectionQuery(
      subsquidClient,
      {
        first: 20,
        orderBy,
        where: {AND: where.filter(Boolean)},
      },
      {
        enabled,
        initialPageParam: undefined,
        getNextPageParam: (lastPage) =>
          lastPage.delegationsConnection.pageInfo.hasNextPage
            ? {after: lastPage.delegationsConnection.pageInfo.endCursor}
            : undefined,
      },
    )

  useEffect(() => {
    if (enabled && inView) {
      void fetchNextPage()
    }
  }, [inView, fetchNextPage, enabled])

  const isEmpty = data?.pages[0].delegationsConnection.totalCount === 0

  const onAction: OnAction = useCallback((basePool, action) => {
    setDialogOpen(true)
    setOperatingDelegation(basePool)
    setDialogAction(action)
  }, [])
  const onClose = useCallback(() => {
    setDialogOpen(false)
  }, [])

  const filters = (
    <Stack spacing={2}>
      {!isVault && (
        <NoSsr>
          <Typography variant="h5" component="div">
            Type
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                color={color}
                checked={vaultFilter}
                onChange={(e) => {
                  setVaultFilter(e.target.checked)
                }}
              />
            }
            label="Vault"
          />
          <FormControlLabel
            control={
              <Checkbox
                color={color}
                checked={stakePoolFilter}
                onChange={(e) => {
                  setStakePoolFilter(e.target.checked)
                }}
              />
            }
            label="StakePool"
          />
        </NoSsr>
      )}
      <Typography variant="h5" component="div">
        Status
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            color={color}
            checked={withdrawingFilter}
            onChange={(e) => {
              setWithdrawingFilterFilter(e.target.checked)
            }}
          />
        }
        label="Withdrawing"
      />
    </Stack>
  )

  return (
    <>
      {showHeader && (
        <SectionHeader icon={<NftsIcon />} title="Delegation NFTs" />
      )}
      <Stack direction="row">
        <Box width={200} display={{xs: 'none', xl: 'block'}}>
          {filters}
        </Box>
        <Box flex="1 0">
          <Stack direction="row" alignItems="center" spacing={{xs: 1, md: 2}}>
            <IconButton
              sx={{display: {xl: 'none'}}}
              onClick={() => {
                setDrawerOpen(true)
              }}
            >
              <FilterList />
            </IconButton>
            <TextField
              value={searchString}
              color={color}
              placeholder="Search PID"
              size="small"
              InputProps={{endAdornment: <Search />}}
              onChange={(e) => {
                setSearchString(e.target.value)
              }}
              sx={{flex: '1', ml: {xl: '0!important'}}}
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
            <ToggleButtonGroup
              color={color}
              size="small"
              value={showNftCard}
              exclusive
              onChange={(_, value: boolean) => {
                if (value !== null) {
                  setShowNftCard(value)
                }
              }}
            >
              <ToggleButton value={true}>
                <GridView />
              </ToggleButton>
              <ToggleButton value={false}>
                <FormatListBulleted />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          <Stack sx={{'>:not(style)+:not(style)': {mt: 1}}} mt={2}>
            {isEmpty ? (
              <Empty sx={{minHeight: 400}} />
            ) : (
              data?.pages.map((page) => (
                <Grid
                  container
                  key={page.delegationsConnection.pageInfo.startCursor}
                  spacing={2}
                >
                  {page.delegationsConnection.edges.map((edge) => {
                    return (
                      <Grid
                        key={edge.node.id}
                        xs={12}
                        md={showNftCard ? 6 : 12}
                      >
                        {showNftCard ? (
                          <NftCard
                            delegation={edge.node}
                            onAction={onAction}
                            isOwner={isOwner}
                          />
                        ) : (
                          <HorizonCard
                            delegation={edge.node}
                            onAction={onAction}
                            isOwner={isOwner}
                          />
                        )}
                      </Grid>
                    )
                  })}
                </Grid>
              ))
            )}

            {(isLoading || hasNextPage === true) &&
              (showNftCard ? (
                <Grid container spacing={2} ref={ref}>
                  {Array.from({length: 6}).map((_, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: static list
                    <Grid xs={12} md={6} key={`skeleton-${index}`}>
                      <Skeleton variant="rounded" height={240} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <ListSkeleton height={105} ref={ref} />
              ))}
          </Stack>
        </Box>
      </Stack>

      <Dialog open={dialogOpen} onClose={onClose}>
        {operatingDelegation != null && (
          <>
            {dialogAction === 'withdraw' && (
              <Withdraw onClose={onClose} delegation={operatingDelegation} />
            )}
          </>
        )}
      </Dialog>

      <Drawer
        PaperProps={{sx: {p: 3}}}
        anchor="left"
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false)
        }}
      >
        {filters}
      </Drawer>
    </>
  )
}

export default DelegationList
