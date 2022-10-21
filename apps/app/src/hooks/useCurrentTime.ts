import {useEffect, useState} from 'react'

const useCurrentTime = (): Date => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return currentTime
}

export default useCurrentTime
