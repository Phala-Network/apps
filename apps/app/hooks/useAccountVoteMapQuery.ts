import {chainAtom} from '@/store/common'
import {useQuery} from '@tanstack/react-query'
import {useAtom} from 'jotai'
import usePolkadotApi from './usePolkadotApi'

const useAccountVoteMapQuery = (account?: string) => {
  const [chain] = useAtom(chainAtom)
  const api = usePolkadotApi()
  const query = useQuery(['AccountVoteMapQuery', chain, account], () => {
    if (!api) return
    api.query.phalaWrappedBalances.accountVoteMap.entries(account).then(() => {
      // TODO: handle total vote
    })
  })

  return query
}

export default useAccountVoteMapQuery
