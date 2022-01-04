import {Keyring} from '@polkadot/api'
import {Block} from 'baseui/block'
import {Value} from 'baseui/select'
import {FC, useEffect, useState} from 'react'
import {useFromAddress, useFromAmount} from '../../store'
import {TransactionInfoItem} from '../../types'
import {AddressInput} from '../AddressInput'
import {AmountInput} from '../AmountInput'
import {CoinSelect} from '../CoinSelect'
import {NetworkSelect} from '../NetworkSelect'
import {TransferPanel} from '../TransferPanel'

interface TransferFromPanelProps {
  transactionInfoItem?: TransactionInfoItem
}

export const TransferFromPanel: FC<TransferFromPanelProps> = () => {
  const [address, setAddress] = useFromAddress()
  const [network, setNetwork] = useState<Value>([{label: 'Phala'}])
  const [coin, setCoin] = useState<Value>([{label: 'PHA'}])
  const [amount, setAmount] = useFromAmount()

  useEffect(() => {
    const keyring = new Keyring({type: 'sr25519'})
    const karuraAccount = keyring.addFromUri('//Alice')

    setAddress(karuraAccount.address)
  }, [setAddress])

  return (
    <TransferPanel label="From">
      <Block display="flex">
        <Block flex={1}>
          <NetworkSelect
            value={network}
            onChange={(params) => setNetwork(params.value)}
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
        <AddressInput
          value={address}
          onChange={(e: any) => setAddress(e.target?.value)}
        />
      </Block>

      <Block marginTop={['20px']}>
        <AmountInput
          value={amount.toString()}
          onChange={(e: any) => setAmount(parseFloat(e.target?.value))}
        />
      </Block>
    </TransferPanel>
  )
}
