import {Block} from 'baseui/block'
import {FC} from 'react'
import {AddressInput} from '../AddressInput'
import {AmountInput} from '../AmountInput'
import {CoinSelect} from '../CoinSelect'
import {NetworkSelect} from '../NetworkSelect'
import {TransferPanel} from '../TransferPanel'

export const TransferToPanel: FC = () => {
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
        <AddressInput />
      </Block>

      <Block marginTop={['20px']}>
        <AmountInput />
      </Block>
    </TransferPanel>
  )
}
