import {toast} from '@phala/react-components'
import {useEthereumBridgeFee} from '@phala/react-libs'
import {validateAddress} from '@phala/utils'
import Decimal from 'decimal.js'
import {ComponentProps, FC} from 'react'
import {useAllTransferData} from '../../store'
import {useBridgePage} from '../../useBridgePage'
import {Button} from '../Button'

interface SubmitButtonProps extends ComponentProps<typeof Button> {
  onSubmit: (transferData: any) => void
}

export const SubmitButton: FC<SubmitButtonProps> = (props) => {
  const {onSubmit} = props
  const {currentAddress, isFromEthereum, isFromKhala, maxAmountDecimal} =
    useBridgePage()
  const allTransferData = useAllTransferData()
  const fee = useEthereumBridgeFee()
  const {amount, toAddress} = allTransferData

  const onSubmitCheck = () => {
    const accountFrom = currentAddress
    const amountTo = amount
    const recipient = toAddress
    let errorString = ''

    if (!amountTo || amountTo <= 0) {
      errorString = 'Need enter amount'
    } else if (!recipient) {
      errorString = 'Need enter recipient'
    } else if (isFromEthereum && !validateAddress(recipient)) {
      errorString = 'Need enter the correct recipient'
    } else if (!accountFrom) {
      errorString = 'Need login'
    } else if (
      isFromKhala &&
      !new RegExp(/0x[0-9a-fA-F]{40}/).test(recipient)
    ) {
      errorString = 'Need enter the correct recipient'
    } else if (new Decimal(amountTo).greaterThan(maxAmountDecimal)) {
      errorString = 'Insufficient balance'
    } else if (
      isFromKhala &&
      fee &&
      new Decimal(amountTo).greaterThan(maxAmountDecimal.sub(fee))
    ) {
      errorString = 'Insufficient balance'
    }

    if (errorString) {
      toast(errorString, 'error')
      return
    }

    onSubmit(allTransferData)
  }

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Button style={{width: '100%'}} {...props} onClick={onSubmitCheck}>
      Submit
    </Button>
  )
}
