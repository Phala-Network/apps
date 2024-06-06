import {bridgeInfoAtom, fromChainAtom} from '@/store/bridge'
import {isWalletConnectAtom} from '@/store/common'
import {Button} from '@mui/material'
import {useAtom} from 'jotai'
import dynamic from 'next/dynamic'
import {type FC, useState} from 'react'
import ConnectWalletButton from '../../ConnectWalletButton'
import EvmAction from './EvmAction'
import PolkadotAction from './PolkadotAction'

const BridgeConfirmationDialog = dynamic(
  async () => await import('../../BridgeConfirmationDialog'),
  {ssr: false},
)

const Action: FC = () => {
  const [open, setOpen] = useState(false)
  const [fromChain] = useAtom(fromChainAtom)
  const [bridgeInfo] = useAtom(bridgeInfoAtom)
  const [isWalletConnected] = useAtom(isWalletConnectAtom)
  const onConfirm = (): void => {
    setOpen(true)
  }
  if (bridgeInfo.kind === 'placeholder') {
    // There is only one placeholder bridge
    return (
      <Button
        size="large"
        variant="contained"
        fullWidth
        href="https://portalbridge.com/advanced-tools/#/transfer?sourceChain=ethereum"
        target="_blank"
        rel="noreferrer"
      >
        Transfer on Portal Bridge
      </Button>
    )
  }

  return (
    <>
      {!isWalletConnected && (
        <ConnectWalletButton size="large" variant="contained" fullWidth />
      )}
      {isWalletConnected && fromChain.kind === 'evm' && (
        <EvmAction onConfirm={onConfirm} />
      )}
      {isWalletConnected && fromChain.kind === 'substrate' && (
        <PolkadotAction onConfirm={onConfirm} />
      )}

      <BridgeConfirmationDialog
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      />
    </>
  )
}

export default Action
