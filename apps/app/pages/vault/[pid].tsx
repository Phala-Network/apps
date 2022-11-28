import DetailPage from '@/components/BasePool/DetailPage'
import {BasePoolKind} from '@/lib/subsquid'
import {NextPage} from 'next'
import {useRouter} from 'next/router'

const Vault: NextPage = () => {
  const {
    query: {pid},
  } = useRouter()
  if (typeof pid !== 'string') return null
  return (
    <>
      <DetailPage kind={BasePoolKind.Vault} pid={pid} />
    </>
  )
}

export default Vault
