import {uniqueId} from 'lodash-es'
import {useState} from 'react'
import useSWR from 'swr'

const useSWRValue = <T>(
  getter: () => T,
  refreshInterval = 60 * 60 * 1000
): T => {
  const id = useState(uniqueId())
  const [fallbackData] = useState(getter())
  const {data} = useSWR(['value', id], async () => getter(), {
    fallbackData,
    refreshInterval,
    revalidateOnFocus: false,
    revalidateIfStale: true,
    refreshWhenHidden: true,
    refreshWhenOffline: true,
  })

  return data
}

export default useSWRValue
