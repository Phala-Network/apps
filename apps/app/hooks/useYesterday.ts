import {useInterval} from '@phala/lib'
import {addDays} from 'date-fns'
import {useEffect, useState} from 'react'

const getYesterday = (): string => addDays(new Date(), -1).toISOString()

const useYesterday = (): string | undefined => {
  const [yesterday, setYesterday] = useState<string>()
  useEffect(() => {
    // MEMO: use client date only
    setYesterday(getYesterday())
  }, [])
  useInterval(() => {
    setYesterday(getYesterday())
  }, 60 * 60 * 1000)

  return yesterday
}
export default useYesterday
