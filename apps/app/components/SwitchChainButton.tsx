import {LoadingButton} from '@mui/lab'
import {mainnet, sepolia} from 'viem/chains'
import {useAccount, useSwitchChain} from 'wagmi'

const targetChain = process.env.VERCEL_ENV === 'production' ? mainnet : sepolia

const SwitchChainButton = ({children}: {children: React.ReactNode}) => {
  const {chain} = useAccount()
  const {switchChain, isPending} = useSwitchChain()
  if (chain == null || chain.id === targetChain.id) {
    return children
  }
  return (
    <LoadingButton
      loading={isPending}
      fullWidth
      color="warning"
      onClick={() => switchChain({chainId: targetChain.id})}
    >
      Switch to {targetChain.name}
    </LoadingButton>
  )
}

export default SwitchChainButton
