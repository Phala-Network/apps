import {useEthereumAccountAtom} from '@phala/store'
import {Button} from 'baseui/button'
import {FC} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {littleRoundButtonOverrides} from '../../../style/littleRoundButtonOverrides'
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
              <Button
                overrides={{
                  BaseButton: {
                    style: {
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      ...littleRoundButtonOverrides?.BaseButton?.style,
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
