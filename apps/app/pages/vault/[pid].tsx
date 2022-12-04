import DetailPage from '@/components/BasePool/DetailPage'
import DelegationList from '@/components/Delegation/List'
import getBasePoolServerSideProps, {
  BasePoolServerSideProps,
} from '@/lib/getBasePoolServerSideProps'
import {subsquidClient} from '@/lib/graphql'
import {useBasePoolByIdQuery} from '@/lib/subsquidQuery'
import {Box} from '@mui/material'
import {NextPage} from 'next'

export const getServerSideProps = getBasePoolServerSideProps('Vault')

const Vault: NextPage<BasePoolServerSideProps> = ({
  pid,
  initialData,
  initialDataUpdatedAt,
}) => {
  const {data} = useBasePoolByIdQuery(
    subsquidClient,
    {id: pid},
    {initialData: initialData || undefined, initialDataUpdatedAt}
  )

  const basePool = data?.basePoolById
  if (!basePool) return null

  return (
    <>
      <DetailPage basePool={basePool} />

      <Box component="section">
        <DelegationList isVault showHeader address={basePool.account.id} />
      </Box>
    </>
  )
}

export default Vault
