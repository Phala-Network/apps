import {useEffect} from 'react'
import {useCurrentNetworkNode} from '../store/networkNode'
import {useLocation} from '@reach/router'

export const useTestnetGuard = () => {
  const {pathname} = useLocation()
  const [currentNetworkNode] = useCurrentNetworkNode()

  useEffect(() => {
    if (pathname !== '/' && currentNetworkNode.id === 'phala-rewards-demo') {
      location.href = '/'
    }
  }, [currentNetworkNode.id, pathname])
}
