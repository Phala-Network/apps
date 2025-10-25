import {useRouter} from 'next/router'
import {useEffect} from 'react'

const Page = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/staking')
  }, [router])

  return null
}

export default Page
