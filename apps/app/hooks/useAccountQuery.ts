import {subsquidClient} from '@/lib/graphql'
import {useAccountByIdQuery} from '@/lib/subsquid'
import {polkadotAccountAtom} from '@phala/store'
import {useAtom} from 'jotai'

const useAccountQuery = () => {
  const [account] = useAtom(polkadotAccountAtom)
  const query = useAccountByIdQuery(
    subsquidClient,
    {accountId: account?.address as string},
    {enabled: !!account}
  )
  return query
}

export default useAccountQuery
