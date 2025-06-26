import DetailPage from '@/components/BasePool/DetailPage'
import DetailPageSkeleton from '@/components/BasePool/DetailPageSkeleton'
import DelegationList from '@/components/Delegation/List'
import {subsquidClient} from '@/config'
import {useBasePoolByIdQuery} from '@/lib/subsquidQuery'
import {Box} from '@mui/material'
import {polkadotAccountAtom} from '@phala/store'
import {useAtom} from 'jotai'
import type {NextPage} from 'next'
import {useRouter} from 'next/router'

const Vault: NextPage = () => {
  const router = useRouter()
  const {pid} = router.query
  const [account] = useAtom(polkadotAccountAtom)

  const {data: basePool, isLoading} = useBasePoolByIdQuery(
    subsquidClient,
    {id: pid as string},
    {
      enabled: typeof pid === 'string',
      select: (data) => data.basePoolById,
    },
  )

  if (typeof pid !== 'string' || isLoading || basePool == null) {
    return <DetailPageSkeleton />
  }

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
