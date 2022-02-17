import {useEthereumAccountAtom} from '@phala/app-store'
import {Block} from 'baseui/block'
import {FC, useEffect} from 'react'
import {Network} from '../../config'
import {
  useAmount,
  useFromAddress,
  useFromCoin,
  useFromNetwork,
} from '../../store'
import {TransactionInfoItem} from '../../types'
import {useBridgePage} from '../../useBridgePage'
import {AddressInput} from '../AddressInput'
import {AmountInput} from '../AmountInput'
import {CoinSelect} from '../CoinSelect'
import {Divider} from '../Divider'
import {NetworkSelect} from '../NetworkSelect'
import {TransferPanel} from '../TransferPanel'
import {AccountStatusControl} from './AccountStatusControl'
import {BalanceLabel} from './BalanceLabel'
import {PolkadotAddressInput} from './PolkadotAddressInput'
import {AddressArea, InputArea} from './styledComponents'

interface TransferFromPanelProps {
  transactionInfoItem?: TransactionInfoItem
}

export const TransferFromPanel: FC<TransferFromPanelProps> = () => {
  const [address, setAddress] = useFromAddress()
  const [network, setNetwork] = useFromNetwork()
  const [coin, setCoin] = useFromCoin()
  const [amount, setAmount] = useAmount()
  const {isFromEthereum} = useBridgePage()
  const [ethereumAccount] = useEthereumAccountAtom()

  useEffect(() => {
    if (isFromEthereum && ethereumAccount) {
      setAddress(ethereumAccount.address)
    }
  }, [ethereumAccount, isFromEthereum, setAddress])

  return (
    <TransferPanel label="From">
      <Block display="flex">
        <Block flex={1}>
          <NetworkSelect
            value={network}
            onChange={(params) => setNetwork(params.value as Network[])}
          />
        </Block>

        <Block flex={1} marginLeft={['20px']}>
          <CoinSelect
            value={coin}
            onChange={(params) => setCoin(params.value)}
          />
        </Block>
      </Block>

      <InputArea>
        <AmountInput
          value={amount}
          onChange={(value: any) => setAmount(value)}
        />

        <Divider />

        <BalanceLabel />
      </InputArea>

      <AddressArea>
        {isFromEthereum && (
          <AddressInput
            disabled={isFromEthereum}
            value={address}
            onChange={(e: any) => setAddress(e.target?.value)}
            endEnhancer={<AccountStatusControl />}
          />
        )}

        {!isFromEthereum && <PolkadotAddressInput />}
      </AddressArea>
    </TransferPanel>
  )
}
