import {Block} from 'baseui/block'
import Decimal from 'decimal.js'
import {FC} from 'react'
import {Network} from '../../config'
import {useAmount, useToAddress, useToCoin, useToNetwork} from '../../store'
import {AddressInput} from '../AddressInput'
import {CoinSelect} from '../CoinSelect'
import {NetworkSelect} from '../NetworkSelect'
import {TransferPanel} from '../TransferPanel'
import {AmountDisplay} from './AmountDisplay'

export const TransferToPanel: FC = () => {
  const [address, setAddress] = useToAddress()
  const [amount] = useAmount()
  const [network, setNetwork] = useToNetwork()
  const [coin, setCoin] = useToCoin()

  return (
    <TransferPanel label="To">
      <Block display="flex">
        <Block flex={1}>
          <NetworkSelect
            value={network}
            onChange={(params) => {
              setNetwork(params.value as Network[])
            }}
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
        <AmountDisplay>
          {new Decimal(amount || 0).toNumber() || 'Amount'}
        </AmountDisplay>
      </Block>

      <Block marginTop={['20px']}>
        <AddressInput
          value={address}
          onChange={(e: any) => setAddress(e.target?.value)}
        />
      </Block>
    </TransferPanel>
  )
}
