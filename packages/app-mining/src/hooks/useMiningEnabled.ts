import {useApiPromise} from '@phala/react-libs'
import {useQuery} from 'react-query'

const useMiningEnabled = (): boolean | undefined => {
  const {api, endpoint} = useApiPromise()

  const {data} = useQuery(['miningEnabled', endpoint], () =>
    api?.query.phalaStakePool?.miningEnabled?.().then((data) => data.toJSON())
  )

  return data
}

export default useMiningEnabled
