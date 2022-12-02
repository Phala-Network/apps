import WorkerIcon from '@/assets/worker.svg'
import ListSkeleton from '@/components/ListSkeleton'
import SectionHeader from '@/components/SectionHeader'
import {subsquidClient} from '@/lib/graphql'
import {
  BasePoolCommonFragment,
  useWorkersConnectionQuery,
  WorkerOrderByInput,
} from '@/lib/subsquidQuery'
import {Button, Pagination, Stack} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {useAtom} from 'jotai'
import {FC, useState} from 'react'
import WorkerCard from './Card'

const pageSize = 10

const WorkerList: FC<{basePool: BasePoolCommonFragment}> = ({basePool}) => {
  const [page, setPage] = useState(1)
  const [account] = useAtom(polkadotAccountAtom)
  const {data, isLoading} = useWorkersConnectionQuery(subsquidClient, {
    after: page === 1 ? undefined : String((page - 1) * pageSize),
    orderBy: WorkerOrderByInput.IdAsc,
    first: pageSize,
    where: {stakePool: {id_eq: basePool.id}},
  })
  const isOwner = account?.address === basePool.owner.id
  return (
    <>
      <SectionHeader title="Workers" icon={<WorkerIcon />}>
        <Stack spacing={2} direction="row" ml="auto">
          <Button>Reclaim All</Button>
          {isOwner && <Button variant="contained">Add</Button>}
        </Stack>
      </SectionHeader>
      <Stack>
        {isLoading ? (
          <ListSkeleton height={94} />
        ) : (
          data?.workersConnection.edges.map(({node, cursor}) => (
            <WorkerCard key={cursor} worker={node} isOwner={isOwner} />
          ))
        )}
      </Stack>

      {data?.workersConnection.totalCount && (
        <Stack alignItems="center" mt={3}>
          <Pagination
            page={page}
            count={Math.ceil(data.workersConnection.totalCount / pageSize)}
            onChange={(_, newPage) => setPage(newPage)}
            showFirstButton
            showLastButton
          />
        </Stack>
      )}
    </>
  )
}

export default WorkerList
