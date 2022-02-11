import {useEthereumAccountAtom} from '@phala/app-store'
import {useAccountsQuery, useEthereumWeb3, useEthers} from '@phala/react-libs'
import {Button} from 'baseui/button'
import {FC, useEffect} from 'react'
import {littleRoundButtonOverrides} from '../../style/littleRoundButtonOverrides'

export interface EthereumConnectWalletProps {
  hidden?: boolean
}

export const EthereumConnectWallet: FC<EthereumConnectWalletProps> = (
  props
) => {
  const {hidden = false} = props

  const {data: accounts = []} = useAccountsQuery()
  const {ethereumWeb3connect} = useEthereumWeb3()
  const {readystate: readyState} = useEthers()
  const isReady = readyState === 'connected'
  const [, setEthereumAccount] = useEthereumAccountAtom()

  useEffect(() => {
    const [account] = accounts
    if (!accounts || !isReady) {
      return
    }

    setEthereumAccount({
      name: account,
      address: account || '',
    })
  }, [accounts, isReady, setEthereumAccount])

  if (hidden) return null

  return (
    <Button
      overrides={littleRoundButtonOverrides}
      onClick={ethereumWeb3connect}
    >
      Connect Wallet
    </Button>
  )
}
