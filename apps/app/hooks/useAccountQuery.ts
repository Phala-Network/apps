import {subsquidClient} from '@/lib/graphql'
import {useAccountByIdQuery, type AccountByIdQuery} from '@/lib/subsquidQuery'
import {polkadotAccountAtom} from '@phala/store'
import {type UseQueryResult} from '@tanstack/react-query'
import {useAtom} from 'jotai'

const useAccountQuery = (): UseQueryResult<
  AccountByIdQuery['accountById'],
  unknown
> => {
  const [account] = useAtom(polkadotAccountAtom)
  const query = useAccountByIdQuery(
    subsquidClient,
    {accountId: account?.address as string},
    {enabled: account !== null, select: (data) => data.accountById}
  )
  return query
}

export default useAccountQuery
