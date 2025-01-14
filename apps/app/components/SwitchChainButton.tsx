import {ethChain} from '@/config'
import {Button} from '@mui/material'
import {useAccount, useSwitchChain} from 'wagmi'

const SwitchChainButton = ({children}: {children: React.ReactNode}) => {
  const {isConnected, chainId} = useAccount()
  const {switchChain, isPending} = useSwitchChain()
  if (!isConnected || chainId === ethChain.id) {
    return children
  }
  return (
    <Button
      loading={isPending}
      fullWidth
      color="warning"
      onClick={() => switchChain({chainId: ethChain.id})}
    >
      Switch to {ethChain.name}
    </Button>
  )
}

export default SwitchChainButton
