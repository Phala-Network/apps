import {Block} from 'baseui/block'
import {FC} from 'react'
import {Network} from '../../config'
import {
  useAmount,
  useFromAddress,
  useFromCoin,
  useFromNetwork,
} from '../../store'
import {TransactionInfoItem} from '../../types'
import {AddressInput} from '../AddressInput'
import {AmountInput} from '../AmountInput'
import {CoinSelect} from '../CoinSelect'
import {Divider} from '../Divider'
import {EthereumConnectWallet} from '../EthereumConnectWallet'
import {NetworkSelect} from '../NetworkSelect'
import {TransferPanel} from '../TransferPanel'
import {BalanceLabel} from './BalanceLabel'

interface TransferFromPanelProps {
  transactionInfoItem?: TransactionInfoItem
}

export const TransferFromPanel: FC<TransferFromPanelProps> = () => {
  const [address, setAddress] = useFromAddress()
  const [network, setNetwork] = useFromNetwork()
  const [coin, setCoin] = useFromCoin()
  const [amount, setAmount] = useAmount()

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

      <Block marginTop={['20px']}>
        <AmountInput
          value={amount}
          onChange={(value: any) => setAmount(value)}
        />

        <Divider />

        <BalanceLabel />
      </Block>

      <Block marginTop={['20px']}>
        <AddressInput
          value={address}
          onChange={(e: any) => setAddress(e.target?.value)}
        />

        <EthereumConnectWallet />
      </Block>
    </TransferPanel>
  )
}
