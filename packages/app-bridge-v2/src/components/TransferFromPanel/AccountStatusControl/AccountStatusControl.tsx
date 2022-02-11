import {useEthereumAccountAtom, usePolkadotAccountAtom} from '@phala/app-store'
import {Button} from 'baseui/button'
import {FC} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {littleRoundButtonOverrides} from '../../../style/littleRoundButtonOverrides'
import {useBridgePage} from '../../../useBridgePage'
import {Approved} from '../../Approved'
import {EthereumAllowance} from '../../EthereumAllowance'
import {EthereumConnectWallet} from '../../EthereumConnectWallet'
import {PolkadotConnectWallet} from '../../PolkadotConnectWallet'

export const AccountStatusControl: FC = () => {
  const [ethereumAccount] = useEthereumAccountAtom()
  const [polkadotAccount] = usePolkadotAccountAtom()
  const {isFromEthereum} = useBridgePage()

  return (
    <div>
      {!isFromEthereum && !polkadotAccount && <PolkadotConnectWallet />}
      {!ethereumAccount && isFromEthereum && <EthereumConnectWallet />}
      {ethereumAccount && isFromEthereum && (
        <ErrorBoundary fallbackRender={() => null}>
          <EthereumAllowance
            placeholder={
              <Button
                overrides={{
                  BaseButton: {
                    style: {
                      ...littleRoundButtonOverrides.BaseButton.style,
                      width: '100px',
                    },
                  },
                }}
              >
                Approve
              </Button>
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
