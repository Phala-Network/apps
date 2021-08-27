import {useQuery} from 'react-query'
import {useApiPromise} from '@phala/react-libs/esm/polkadot/hooks/useApiPromise'

const useGracePeriod = () => {
  const {api, initialized} = useApiPromise()
  return useQuery<number | null>(
    ['gracePeriod', initialized],
    () => (api?.consts.phalaStakePool?.gracePeriod?.toJSON() as number) ?? null,
    {refetchOnMount: false}
  )
}

export default useGracePeriod
