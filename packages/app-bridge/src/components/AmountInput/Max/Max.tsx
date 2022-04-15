import Decimal from 'decimal.js'
import {FC} from 'react'
import {useAmount} from '../../../store'
import {littleRoundButtonOverrides} from '../../../style/littleRoundButtonOverrides'
import {useBridgePage} from '../../../useBridgePage'
import {Button} from '../../Button'

export const Max: FC = () => {
  const [, setAmount] = useAmount()
  const {currentBalance, isFromEthereum} = useBridgePage()

  const maxAmountDecimal = new Decimal(currentBalance || 0)

  const isShowMaxButton = maxAmountDecimal.greaterThan(0) && isFromEthereum

  function setMax() {
    setAmount(parseFloat(maxAmountDecimal.toFixed(8, Decimal.ROUND_DOWN)))
  }

  if (!isShowMaxButton) {
    return null
  }

  return (
    <Button
      overrides={{
        BaseButton: {
          style: {
            ...littleRoundButtonOverrides.BaseButton.style,
            width: 'auto',
            backgroundColor: 'white',
          },
        },
      }}
      onClick={setMax}
    >
      Max
    </Button>
  )
}
