import NftsIcon from '@/assets/nfts.svg'
import usePolkadotApi from '@/hooks/usePolkadotApi'
import {
  type NftsConnectionQuery,
  useNftsConnectionQuery,
} from '@/lib/subsquidQuery'
import {chainAtom, subsquidClientAtom} from '@/store/common'
import {
  Box,
  Chip,
  Unstable_Grid2 as Grid,
  Pagination,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import type {ApiPromise} from '@polkadot/api'
import {keepPreviousData} from '@tanstack/react-query'
import {useAtom} from 'jotai'
import {type FC, useState} from 'react'
import useSWRImmutable from 'swr/immutable'
import DelegationNftCover from './DelegationNftCover'
import Empty from './Empty'
import SectionHeader from './SectionHeader'

type Nft = NftsConnectionQuery['nftsConnection']['edges'][number]['node']

const nftNameFetcher = async ([api, cid, nftId, _]: [
  ApiPromise,
  number,
  number,
  string,
]): Promise<string | undefined> => {
  const property = await api.query.rmrkCore.properties(cid, nftId, 'name')
  try {
    return property.unwrap().toUtf8()
  } catch (e) {
    // noop
  }
}

const collectionSymbolFetcher = async ([api, cid, _]: [
  ApiPromise,
  number,
  string,
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
  const [chain] = useAtom(chainAtom)
  const isDelegationNft = nft.delegation != null
  const {data: name} = useSWRImmutable(
    api != null && isDelegationNft
      ? [api, nft.cid, nft.nftId, 'nftName']
      : null,
    nftNameFetcher,
  )
  const {data: collectionSymbol} = useSWRImmutable(
    api != null && isDelegationNft && [api, nft.cid, 'nftCollection'],
    collectionSymbolFetcher,
  )
  const delegationNftPrefix = `${chain === 'khala' ? 'Khala' : 'Phala'} - ${
    nft.delegation?.basePool.kind ?? ''
  }`

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
          {nft.delegation != null && (
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
          {isDelegationNft
            ? `${delegationNftPrefix} Delegation NFT - #${
                nft.delegation?.basePool.id ?? ''
              } - ${nft.nftId}`
            : name ?? <Skeleton width="100%" />}
        </Typography>
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          mt={1}
        >
          {isDelegationNft
            ? `${delegationNftPrefix} - #${nft.delegation?.basePool.id ?? ''}`
            : collectionSymbol ?? <Skeleton width="30%" />}
        </Typography>
      </Stack>
    </Paper>
  )
}

const pageSize = 8

const DashboardNftList: FC = () => {
  const [page, setPage] = useState(1)
  const [account] = useAtom(polkadotAccountAtom)
  const [subsquidClient] = useAtom(subsquidClientAtom)
  const {data} = useNftsConnectionQuery(
    subsquidClient,
    {
      after: page === 1 ? undefined : String((page - 1) * pageSize),
      orderBy: 'mintTime_DESC',
      first: pageSize,
      where: {
        owner: {id_eq: account?.address},
        // TODO: remove this filter when PW NFTs are ready
        cid_gte: 10000,
        delegation: {shares_gt: '0'},
      },
    },
    {
      enabled: account !== null,
      placeholderData: keepPreviousData,
    },
  )
  const isEmpty = data?.nftsConnection.totalCount === 0
  return (
    <>
      <SectionHeader title="NFTs" icon={<NftsIcon />}>
        {data != null && !isEmpty && (
          <Chip
            label={data?.nftsConnection.totalCount}
            color="primary"
            size="small"
            sx={{ml: 2}}
          />
        )}
      </SectionHeader>

      <Grid container spacing={{xs: 1, sm: 2, md: 3}}>
        {data?.nftsConnection.edges.map((edge) => {
          return (
            <Grid key={edge.cursor} xs={6} md={4} lg={3}>
              <NftCard nft={edge.node} />
            </Grid>
          )
        })}
      </Grid>

      {isEmpty && <Empty sx={{height: 400}} />}

      {data != null && !isEmpty && (
        <Stack alignItems="center" mt={3}>
          <Pagination
            color="primary"
            page={page}
            count={Math.ceil(data.nftsConnection.totalCount / pageSize)}
            onChange={(_, newPage) => {
              setPage(newPage)
            }}
            showFirstButton
            showLastButton
          />
        </Stack>
      )}
    </>
  )
}

export default DashboardNftList
