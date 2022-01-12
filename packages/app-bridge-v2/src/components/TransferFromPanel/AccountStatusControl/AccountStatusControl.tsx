import {useEthereumAccountAtom} from '@phala/app-store'
import {FC} from 'react'
import {useBridgePage} from '../../../useBridgePage'
import {Approved} from '../../Approved'
import {EthereumConnectWallet} from '../../EthereumConnectWallet'

export const AccountStatusControl: FC = () => {
  const [ethereumAccount] = useEthereumAccountAtom()
  const {isFromEthereum} = useBridgePage()

  return (
    <div>
      {!ethereumAccount && isFromEthereum && <EthereumConnectWallet />}
      {ethereumAccount && isFromEthereum && <Approved />}
    </div>
  )
}
