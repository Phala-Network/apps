import NftsIcon from '@/assets/nfts.svg'
import Empty from '@/components/Empty'
import ListSkeleton from '@/components/ListSkeleton'
import SectionHeader from '@/components/SectionHeader'
import {subsquidClient} from '@/lib/graphql'
import {
  BasePoolKind,
  DelegationCommonFragment,
  DelegationOrderByInput,
  DelegationWhereInput,
  useInfiniteDelegationsConnectionQuery,
} from '@/lib/subsquidQuery'
import FilterList from '@mui/icons-material/FilterList'
import FormatListBulleted from '@mui/icons-material/FormatListBulleted'
import GridView from '@mui/icons-material/GridView'
import Search from '@mui/icons-material/Search'
import {
  Box,
  Checkbox,
  Dialog,
  FormControlLabel,
  IconButton,
  MenuItem,
  NoSsr,
  Skeleton,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import {isTruthy} from '@phala/util'
import {debounce} from 'lodash-es'
import dynamic from 'next/dynamic'
import {FC, useCallback, useEffect, useState} from 'react'
import {useInView} from 'react-intersection-observer'
import HorizonCard from './HorizonCard'
import NftCard from './NftCard'

const Withdraw = dynamic(() => import('./Withdraw'))

export type DelegationDialogAction = 'withdraw'
export type OnAction = (
  delegation: DelegationCommonFragment,
  action: DelegationDialogAction
) => void

const orderByEntries: [string, DelegationOrderByInput][] = [
  ['Value high to low', DelegationOrderByInput.ValueDesc],
  ['Value low to high', DelegationOrderByInput.ValueAsc],
  ['APR high to low', DelegationOrderByInput.BasePoolAprMultiplierDesc],
  ['APR low to high', DelegationOrderByInput.BasePoolAprMultiplierAsc],
  ['PID small to large', DelegationOrderByInput.BasePoolPidAsc],
  ['PID large to small', DelegationOrderByInput.BasePoolPidDesc],
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
  const [orderBy, setOrderBy] = useState<DelegationOrderByInput>(
    DelegationOrderByInput.ValueDesc
  )
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
    {shares_gt: '0'},
    !!searchString && {
      OR: [{basePool: {id_startsWith: searchString}}],
    },
    !isVault && {
      basePool: {
        kind_in: [
          vaultFilter && ('Vault' as BasePoolKind),
          stakePoolFilter && ('StakePool' as BasePoolKind),
        ].filter(isTruthy),
      },
    },
    withdrawingFilter && {withdrawingValue_gt: '0'},
  ]
  const enabled = !!address
  const {data, isLoading, fetchNextPage, hasNextPage} =
    useInfiniteDelegationsConnectionQuery(
      'after',
      subsquidClient,
      {first: 20, orderBy, where: {AND: where.filter(isTruthy)}},
      {
        keepPreviousData: true,
        enabled: !!address,
        getNextPageParam: (lastPage) =>
          lastPage.delegationsConnection.pageInfo.hasNextPage
            ? lastPage.delegationsConnection.pageInfo.endCursor
            : undefined,
      }
    )

  useEffect(() => {
    if (enabled && inView) {
      fetchNextPage()
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
    <>
      {showHeader && (
        <SectionHeader icon={<NftsIcon />} title="Delegation NFTs" />
      )}
      <Stack direction="row">
        <Box width={256} display={{xs: 'none', xl: 'block'}}>
          {filters}
        </Box>
        <Box flex="1 0">
          <Stack direction="row" alignItems="center" spacing={{xs: 1, md: 2}}>
            <IconButton sx={{display: {xl: 'none'}}}>
              <FilterList />
            </IconButton>
            <TextField
              color={color}
              placeholder="Search PID"
              size="small"
              InputProps={{endAdornment: <Search />}}
              onChange={(e) => debouncedSetSearchString(e.target.value)}
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
              onChange={(e, value: boolean) => {
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
          <Stack spacing={2} mt={2}>
            {isEmpty ? (
              <Empty sx={{minHeight: 400}} />
            ) : (
              data?.pages.map((page, index) => (
                <Grid container key={index} spacing={2}>
                  {page.delegationsConnection.edges.map((edge) => (
                    <Grid key={edge.node.id} xs={12} md={showNftCard ? 6 : 12}>
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
                  ))}
                </Grid>
              ))
            )}

            {(isLoading || hasNextPage) &&
              (showNftCard ? (
                <Grid container spacing={2} ref={ref}>
                  {Array.from({length: 6}).map((_, index) => (
                    <Grid xs={12} md={6} key={index}>
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
        {operatingDelegation && (
          <>
            {dialogAction === 'withdraw' && (
              <Withdraw onClose={onClose} delegation={operatingDelegation} />
            )}
          </>
        )}
      </Dialog>
    </>
  )
}

export default DelegationList
