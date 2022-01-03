import {Keyring} from '@polkadot/api'
import {Block} from 'baseui/block'
import {FC, useEffect, useState} from 'react'
import {AddressInput} from '../AddressInput'
import {CoinSelect} from '../CoinSelect'
import {NetworkSelect} from '../NetworkSelect'
import {TransferPanel} from '../TransferPanel'
import {AmountDisplay} from './AmountDisplay'

export const TransferToPanel: FC = () => {
  const [address, setAddress] = useState('')

  useEffect(() => {
    const keyring = new Keyring({type: 'sr25519'})
    const karuraAccount = keyring.addFromUri('//Bob')

    setAddress(karuraAccount.address)
  }, [])

  return (
    <TransferPanel label="From">
      <Block display="flex">
        <Block flex={1}>
          <NetworkSelect />
        </Block>

        <Block flex={1} marginLeft={['20px']}>
          <CoinSelect />
        </Block>
      </Block>

      <Block marginTop={['20px']}>
        <AddressInput
          value={address}
          onChange={(e: any) => setAddress(e.target?.value)}
        />
      </Block>

      <Block marginTop={['20px']}>
        <AmountDisplay>1000</AmountDisplay>
      </Block>
    </TransferPanel>
  )
}
