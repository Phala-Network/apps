import DetailPage from '@/components/BasePool/DetailPage'
import WorkerList from '@/components/BasePool/Worker/List'
import getBasePoolServerSideProps, {
  type BasePoolServerSideProps,
} from '@/lib/getBasePoolServerSideProps'
import {useBasePoolByIdQuery} from '@/lib/subsquidQuery'
import {subsquidClientAtom} from '@/store/common'
import {Box} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {useAtom} from 'jotai'
import type {NextPage} from 'next'

export const getServerSideProps = getBasePoolServerSideProps('StakePool')

const StakePool: NextPage<BasePoolServerSideProps> = ({
  pid,
  initialData,
  initialDataUpdatedAt,
}) => {
  const [account] = useAtom(polkadotAccountAtom)
  const [subsquidClient] = useAtom(subsquidClientAtom)
  const {data: basePool} = useBasePoolByIdQuery(
    subsquidClient,
    {id: pid, accountId: account?.address},
    {
      initialData: initialData ?? undefined,
      initialDataUpdatedAt,
      select: (data) => data.basePoolById,
    },
  )

  if (basePool == null) return null

  return (
    <>
      <DetailPage basePool={basePool} />
      <Box component="section" mt={2} display="flow-root">
        <WorkerList basePool={basePool} />
      </Box>
    </>
  )
}

export default StakePool
