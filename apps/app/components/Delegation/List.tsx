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
import {
  FilterList,
  FormatListBulleted,
  GridView,
  Search,
} from '@mui/icons-material'
import {
  Box,
  Checkbox,
  Dialog,
  FormControlLabel,
  IconButton,
  MenuItem,
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
import {FC, useCallback, useState} from 'react'
import HorizonCard from './HorizonCard'
import NftCard from './NftCard'

const Withdraw = dynamic(() => import('./Withdraw'), {
  ssr: false,
})

export type DelegationDialogAction = 'withdraw'
export type OnAction = (
  delegation: DelegationCommonFragment,
  action: DelegationDialogAction
) => void

const orderByEntries: [string, DelegationOrderByInput][] = [
  ['Value high to low', DelegationOrderByInput.ValueDesc],
  ['Value low to high', DelegationOrderByInput.ValueAsc],
  ['Pid Asc', DelegationOrderByInput.BasePoolIdAsc],
  ['Pid Desc', DelegationOrderByInput.BasePoolIdDesc],
]

const DelegationList: FC<{
  showHeader?: boolean
  address?: string
  isVault?: boolean
}> = ({address, isVault = false, showHeader = false}) => {
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
      OR: [{basePool: {id_contains: searchString}}],
    },
    !isVault &&
      (vaultFilter || stakePoolFilter) && {
        basePool: {
          kind_in: [
            vaultFilter && ('Vault' as BasePoolKind),
            stakePoolFilter && ('StakePool' as BasePoolKind),
          ].filter(isTruthy),
        },
      },
  ]
  const {data, isLoading} = useInfiniteDelegationsConnectionQuery(
    'after',
    subsquidClient,
    {first: 99, orderBy, where: {AND: where.filter(isTruthy)}},
    {
      keepPreviousData: true,
      enabled: !!address,
      getNextPageParam: (lastPage) =>
        lastPage.delegationsConnection.pageInfo.endCursor,
    }
  )
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
        <>
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
        </>
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
              placeholder="Search Pid"
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
              onChange={(e, value) => {
                setShowNftCard(value)
              }}
            >
              <ToggleButton value={true} aria-label="left aligned">
                <GridView />
              </ToggleButton>
              <ToggleButton value={false} aria-label="centered">
                <FormatListBulleted />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          <Stack spacing={2} mt={2}>
            {isLoading ? (
              <ListSkeleton height={105} />
            ) : isEmpty ? (
              <Empty sx={{minHeight: 400}} />
            ) : (
              data?.pages.map((page, index) => (
                <Grid container key={index} spacing={2}>
                  {page.delegationsConnection.edges.map((edge) => (
                    <Grid key={edge.node.id} xs={12} md={showNftCard ? 6 : 12}>
                      {showNftCard ? (
                        <NftCard delegation={edge.node} onAction={onAction} />
                      ) : (
                        <HorizonCard
                          delegation={edge.node}
                          onAction={onAction}
                        />
                      )}
                    </Grid>
                  ))}
                </Grid>
              ))
            )}
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
