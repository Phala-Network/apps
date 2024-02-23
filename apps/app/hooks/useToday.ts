import useSWR from 'swr'

const getToday = () => {
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  return today.getTime()
}

const useToday = () => {
  const {data} = useSWR('now', getToday, {
    fallbackData: getToday(),
    refreshInterval: 60 * 1000,
    revalidateIfStale: true,
    refreshWhenHidden: true,
    refreshWhenOffline: true,
  })
  return data
}

export default useToday
