import {useState, useEffect} from 'react'

type Endpoint = string | undefined

const useCustomEndpoint = (): Endpoint => {
  const [endpoint, setEndpoint] = useState<Endpoint>()
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const endpointParam = params.get('endpoint')
    if (endpointParam) {
      setEndpoint(decodeURIComponent(endpointParam))
    }
  }, [])

  return endpoint
}

export default useCustomEndpoint
