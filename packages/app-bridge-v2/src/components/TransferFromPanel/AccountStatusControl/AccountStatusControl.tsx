import {useEthereumAccountAtom} from '@phala/app-store'
import {Button} from 'baseui/button'
import {FC} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {littleRoundButtonOverrides} from '../../../style/littleRoundButtonOverrieds'
import {useBridgePage} from '../../../useBridgePage'
import {Approved} from '../../Approved'
import {EthereumAllowance} from '../../EthereumAllowance'
import {EthereumConnectWallet} from '../../EthereumConnectWallet'

export const AccountStatusControl: FC = () => {
  const [ethereumAccount] = useEthereumAccountAtom()
  const {isFromEthereum} = useBridgePage()

  return (
    <div>
      {!ethereumAccount && isFromEthereum && <EthereumConnectWallet />}
      {ethereumAccount && isFromEthereum && (
        <ErrorBoundary fallbackRender={() => null}>
          <EthereumAllowance
            placeholder={
              <Button overrides={littleRoundButtonOverrides}>Approve</Button>
            }
            account={ethereumAccount.address}
          >
            <Approved />
          </EthereumAllowance>
        </ErrorBoundary>
      )}
    </div>
  )
}
