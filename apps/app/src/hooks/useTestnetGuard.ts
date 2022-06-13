import {useLocation} from '@reach/router'
import {useEffect} from 'react'
import {useCurrentNetworkNode} from '../store/networkNode'

export const useTestnetGuard = () => {
  const {pathname} = useLocation()
  const [currentNetworkNode] = useCurrentNetworkNode()

  useEffect(() => {
    if (pathname !== '/' && currentNetworkNode.id === 'phala-via-phala') {
      location.href = '/'
    }
  }, [currentNetworkNode.id, pathname])
}
