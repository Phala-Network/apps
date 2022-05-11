import {fromChainAtom} from '@/store/bridge'
import {isWalletConnectAtom} from '@/store/common'
import {useAtom} from 'jotai'
import dynamic from 'next/dynamic'
import {FC, useState} from 'react'
import ConnectWalletButton from '../../ConnectWalletButton'
import EvmAction from './EvmAction'
import PolkadotAction from './PolkadotAction'

const BridgeConfirmationDialog = dynamic(
  () => import('../../BridgeConfirmationDialog'),
  {ssr: false}
)

const Action: FC = () => {
  const [open, setOpen] = useState(false)
  const [fromChain] = useAtom(fromChainAtom)
  const [isWalletConnected] = useAtom(isWalletConnectAtom)
  const onConfirm = () => {
    setOpen(true)
  }

  return (
    <>
      {!isWalletConnected && (
        <ConnectWalletButton size="large" variant="contained" fullWidth />
      )}
      {isWalletConnected && fromChain.kind === 'evm' && (
        <EvmAction onConfirm={onConfirm} />
      )}
      {isWalletConnected && fromChain.kind === 'polkadot' && (
        <PolkadotAction onConfirm={onConfirm} />
      )}

      <BridgeConfirmationDialog open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default Action
