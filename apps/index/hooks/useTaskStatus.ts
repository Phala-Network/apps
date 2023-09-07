import {clientAtom, currentTaskAtom} from '@/store/core'
import {type Task} from '@phala/index'
import {useAtom} from 'jotai'
import useSWR, {type SWRResponse} from 'swr'

const useCurrentTask = (): SWRResponse<Task> => {
  const [client] = useAtom(clientAtom)
  const [currentTask] = useAtom(currentTaskAtom)
  const swr = useSWR(
    currentTask != null &&
      client != null && [currentTask.id, client, 'taskStatus'],
    async ([taskId, client]) => {
      return await client.getTask(taskId)
    },
    {
      refreshInterval: (latestData) => {
        if (latestData != null && 'completed' in latestData.status) {
          return 0
        }
        return 3000
      },
    },
  )

  return swr
}

export default useCurrentTask
