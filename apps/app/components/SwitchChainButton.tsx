import {ethChain} from '@/config'
import {LoadingButton} from '@mui/lab'
import {useAccount, useSwitchChain} from 'wagmi'

const SwitchChainButton = ({children}: {children: React.ReactNode}) => {
  const {chain} = useAccount()
  const {switchChain, isPending} = useSwitchChain()
  if (chain?.id === ethChain.id) {
    return children
  }
  return (
    <LoadingButton
      loading={isPending}
      fullWidth
      color="warning"
      onClick={() => switchChain({chainId: ethChain.id})}
    >
      Switch to {ethChain.name}
    </LoadingButton>
  )
}

export default SwitchChainButton
