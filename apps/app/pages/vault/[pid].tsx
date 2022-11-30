import DetailPage from '@/components/BasePool/DetailPage'
import DelegationList from '@/components/Delegation/List'
import getBasePoolServerSideProps, {
  BasePoolServerSideProps,
} from '@/lib/getBasePoolServerSideProps'
import {subsquidClient} from '@/lib/graphql'
import {useBasePoolByIdQuery} from '@/lib/subsquidQuery'
import {NextPage} from 'next'

export const getServerSideProps = getBasePoolServerSideProps('Vault')

const Vault: NextPage<BasePoolServerSideProps> = ({pid, basePoolQuery}) => {
  const {data} = useBasePoolByIdQuery(
    subsquidClient,
    {id: pid},
    {initialData: basePoolQuery}
  )

  const basePool = data?.basePoolById
  if (!basePool) return null

  return (
    <>
      <DetailPage basePool={basePool} />
      <DelegationList isVault />
    </>
  )
}

export default Vault
