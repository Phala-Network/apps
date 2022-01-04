import {Keyring} from '@polkadot/api'
import {Block} from 'baseui/block'
import {FC, useEffect} from 'react'
import {useFromAmount, useToAddress, useToCoin, useToNetwork} from '../../store'
import {AddressInput} from '../AddressInput'
import {CoinSelect} from '../CoinSelect'
import {NetworkSelect} from '../NetworkSelect'
import {TransferPanel} from '../TransferPanel'
import {AmountDisplay} from './AmountDisplay'

export const TransferToPanel: FC = () => {
  const [address, setAddress] = useToAddress()
  const [amount] = useFromAmount()
  const [network, setNetwork] = useToNetwork()
  const [coin, setCoin] = useToCoin()

  useEffect(() => {
    const keyring = new Keyring({type: 'sr25519'})
    const karuraAccount = keyring.addFromUri('//Bob')

    setAddress(karuraAccount.address)
  }, [setAddress])

  return (
    <TransferPanel label="To">
      <Block display="flex">
        <Block flex={1}>
          <NetworkSelect
            value={network}
            onChange={(params) => {
              setNetwork(params.value)
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
        <AddressInput
          value={address}
          onChange={(e: any) => setAddress(e.target?.value)}
        />
      </Block>

      <Block marginTop={['20px']}>
        <AmountDisplay>{amount || 'Amount'}</AmountDisplay>
      </Block>
    </TransferPanel>
  )
}
