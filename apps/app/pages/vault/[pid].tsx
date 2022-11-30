import DetailPage from '@/components/BasePool/DetailPage'
import {BasePoolKind} from '@/lib/subsquid'
import {NextPage} from 'next'
import {useRouter} from 'next/router'

const Vault: NextPage = () => {
  const {
    query: {pid},
  } = useRouter()
  return (
    <>
      <DetailPage kind={BasePoolKind.Vault} pid={pid} />
    </>
  )
}

export default Vault
