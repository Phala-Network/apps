import useDeposit from '@/hooks/useDeposit'
import {ChainType} from '@/lib/fetchConfig'
import {isWalletConnectAtom} from '@/store/common'
import {fromChainAtom} from '@/store/core'
import {useAtom} from 'jotai'
import {useState, type FC} from 'react'
import ConnectWalletButton from '../../ConnectWalletButton'
import EvmAction from './EvmAction'
import PolkadotAction from './PolkadotAction'

const Action: FC = () => {
  const [fromChain] = useAtom(fromChainAtom)
  const [loading, setLoading] = useState(false)
  const [isWalletConnected] = useAtom(isWalletConnectAtom)
  const deposit = useDeposit()
  const onConfirm = (): void => {
    setLoading(true)
    try {
      void deposit({
        onReady: () => {
          setLoading(false)
        },
      })
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <>
      {!isWalletConnected && (
        <ConnectWalletButton size="large" variant="contained" fullWidth />
      )}
      {isWalletConnected && fromChain.chainType === ChainType.EVM && (
        <EvmAction onConfirm={onConfirm} loading={loading} />
      )}
      {isWalletConnected && fromChain.chainType === ChainType.Substrate && (
        <PolkadotAction onConfirm={onConfirm} loading={loading} />
      )}
    </>
  )
}

export default Action
