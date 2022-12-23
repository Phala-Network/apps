import NftsIcon from '@/assets/nfts.svg'
import usePolkadotApi from '@/hooks/usePolkadotApi'
import {subsquidClient} from '@/lib/graphql'
import {NftsConnectionQuery, useNftsConnectionQuery} from '@/lib/subsquidQuery'
import {
  Box,
  Chip,
  Pagination,
  Paper,
  Skeleton,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {ApiPromise} from '@polkadot/api'
import {useAtom} from 'jotai'
import {FC, useState} from 'react'
import useSWRImmutable from 'swr/immutable'
import DelegationNftCover from './DelegationNftCover'
import Empty from './Empty'
import SectionHeader from './SectionHeader'

type Nft = NftsConnectionQuery['nftsConnection']['edges'][number]['node']

const nftNameFetcher = async ([api, cid, nftId]: [
  ApiPromise,
  number,
  number
]): Promise<string | undefined> => {
  const property = await api.query.rmrkCore.properties(cid, nftId, 'name')
  try {
    return property.unwrap().toUtf8()
  } catch (e) {
    // noop
  }
}

const collectionSymbolFetcher = async ([api, cid]: [
  ApiPromise,
  number
]): Promise<string | undefined> => {
  const collection = await api.query.rmrkCore.collections(cid)
  try {
    return collection.unwrap().symbol.toUtf8()
  } catch (e) {
    // noop
  }
}

const NftCard: FC<{nft: Nft}> = ({nft}) => {
  const api = usePolkadotApi()
  const {data: name} = useSWRImmutable(
    api ? [api, nft.cid, nft.nftId, 'nftName'] : null,
    nftNameFetcher
  )
  const {data: collectionSymbol} = useSWRImmutable(
    api ? [api, nft.cid, 'nftCollection'] : null,
    collectionSymbolFetcher
  )
  return (
    <Paper
      sx={{
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box pt="100%" bgcolor="#333" position="relative">
        <Box position="absolute" top={0} left={0} right={0} bottom={0}>
          {nft.delegation && (
            <DelegationNftCover
              delegation={nft.delegation}
              nft={nft}
              variant="dashboard"
            />
          )}
        </Box>
      </Box>
      <Stack p={1.5} justifyContent="space-between" flex="1" minHeight={90}>
        <Typography variant="subtitle2" component="div">
          {name === undefined ? <Skeleton width="100%" /> : name}
        </Typography>
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          mt={1}
        >
          {collectionSymbol === undefined ? (
            <Skeleton width="30%" />
          ) : (
            collectionSymbol
          )}
        </Typography>
      </Stack>
    </Paper>
  )
}

const pageSize = 8

const DashboardNftList: FC = () => {
  const [page, setPage] = useState(1)
  const [account] = useAtom(polkadotAccountAtom)
  const {data} = useNftsConnectionQuery(
    subsquidClient,
    {
      after: page === 1 ? undefined : String((page - 1) * pageSize),
      orderBy: 'mintTime_DESC',
      first: pageSize,
      where: {
        owner: {id_eq: account?.address},
        burned_eq: false,
        // TODO: remove this filter when PW NFTs are ready
        cid_gte: 10000,
      },
    },
    {
      enabled: !!account,
      keepPreviousData: true,
    }
  )
  const isEmpty = data?.nftsConnection.totalCount === 0
  return (
    <>
      <SectionHeader title="NFTs" icon={<NftsIcon />}>
        {data && !isEmpty && (
          <Chip
            label={data?.nftsConnection.totalCount}
            color="primary"
            size="small"
            sx={{ml: 2}}
          />
        )}
      </SectionHeader>

      <Grid container spacing={{xs: 1, sm: 2, md: 3}}>
        {data &&
          data.nftsConnection.edges.map((edge) => {
            return (
              <Grid key={edge.cursor} xs={6} md={4} lg={3}>
                <NftCard nft={edge.node} />
              </Grid>
            )
          })}
      </Grid>

      {isEmpty && <Empty sx={{height: 400}} />}

      {data && !isEmpty && (
        <Stack alignItems="center" mt={3}>
          <Pagination
            color="primary"
            page={page}
            count={Math.ceil(data.nftsConnection.totalCount / pageSize)}
            onChange={(_, newPage) => setPage(newPage)}
            showFirstButton
            showLastButton
          />
        </Stack>
      )}
    </>
  )
}

export default DashboardNftList
