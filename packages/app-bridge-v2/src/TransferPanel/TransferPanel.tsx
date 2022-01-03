import {Block} from 'baseui/block'
import {AddressInput} from '../AddressInput'
import {AmountInput} from '../AmountInput'
import {CoinSelect} from './CoinSelect'
import {NetworkSelect} from './NetworkSelect'
import {Root} from './styledComponents'

export const TransferPanel = () => {
  return (
    <Root>
      <Block display="flex">
        <NetworkSelect />
        <CoinSelect />
      </Block>

      <AddressInput />
      <AmountInput />
    </Root>
  )
}
