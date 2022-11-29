import DelegationList from '@/components/Delegation/List'
import PageHeader from '@/components/PageHeader'
import {polkadotAccountAtom} from '@phala/store'
import {useAtom} from 'jotai'
import {FC} from 'react'

const MyDelegation: FC = () => {
  const [polkadotAccount] = useAtom(polkadotAccountAtom)
  return (
    <>
      <PageHeader title="My Delegation"></PageHeader>
      <DelegationList address={polkadotAccount?.address} />
    </>
  )
}

export default MyDelegation
