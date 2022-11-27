import {VoidFn} from '@polkadot/api/types'
import {useEffect, useState} from 'react'
import usePolkadotApi from './usePolkadotApi'

interface Description {
  telegram?: string
  discord?: string
  wechat?: string
  twitter?: string
  email?: string
  forum?: string
  announcement?: string
}

const usePoolDescription = (pid: string) => {
  const api = usePolkadotApi()
  const [telegram, setTelegram] = useState<string>()
  const [discord, setDiscord] = useState<string>()
  const [wechat, setWechat] = useState<string>()
  const [twitter, setTwitter] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [forum, setForum] = useState<string>()
  const [announcement, setAnnouncement] = useState<string>()

  useEffect(() => {
    let unsub: VoidFn
    let unmounted = false
    if (api) {
      api.query.phalaBasePool.poolDescriptions(pid, (bytes) => {
        try {
          if (!unmounted) {
            const unwrapped = bytes.unwrap()
            const json = api
              .createType('AppBasePoolDescription', unwrapped)
              .toJSON() as Description
            setTelegram(json.telegram)
            setDiscord(json.discord)
            setWechat(json.wechat)
            setTwitter(json.twitter)
            setEmail(json.email)
            setForum(json.forum)
            setAnnouncement(json.announcement)
          }
        } catch (err) {
          // noop
        }
      })
    }
    return () => {
      unmounted = true
      unsub?.()
    }
  }, [pid, api])

  return {telegram, discord, wechat, twitter, email, forum, announcement}
}

export default usePoolDescription
