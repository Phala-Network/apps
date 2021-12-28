import {CoinSelect} from './CoinSelect'
import {NetworkSelect} from './NetworkSelect'
import {Root} from './styledComponents'

export const TransferPanel = () => {
  return (
    <Root>
      <NetworkSelect />
      <CoinSelect />
    </Root>
  )
}
