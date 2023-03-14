import DetailPage from '@/components/BasePool/DetailPage'
import DelegationList from '@/components/Delegation/List'
import fixBasePoolFree from '@/lib/fixBasePoolFree'
import getBasePoolServerSideProps, {
  type BasePoolServerSideProps,
} from '@/lib/getBasePoolServerSideProps'
import {subsquidClient} from '@/lib/graphql'
import {useBasePoolByIdQuery} from '@/lib/subsquidQuery'
import {Box} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {useAtom} from 'jotai'
import {create} from 'mutative'
import {type NextPage} from 'next'

export const getServerSideProps = getBasePoolServerSideProps('Vault')

const Vault: NextPage<BasePoolServerSideProps> = ({
  pid,
  initialData,
  initialDataUpdatedAt,
}) => {
  const [account] = useAtom(polkadotAccountAtom)
  const {data: basePool} = useBasePoolByIdQuery(
    subsquidClient,
    {id: pid},
    {
      initialData: initialData ?? undefined,
      initialDataUpdatedAt,
      select: (data) => {
        if (data.basePoolById != null) {
          return create(data.basePoolById, fixBasePoolFree)
        }
      },
    }
  )

  if (basePool == null) return null

  return (
    <>
      <DetailPage basePool={basePool} />

      <Box component="section" mt={2} display="flow-root">
        <DelegationList
          isVault
          showHeader
          address={basePool.account.id}
          isOwner={basePool.owner.id === account?.address}
        />
      </Box>
    </>
  )
}

export default Vault
