import {toast} from '@phala/react-components'
import {useEthereumBridgeFee} from '@phala/react-libs'
import {validateAddress} from '@phala/utils'
import Decimal from 'decimal.js'
import {ComponentProps, FC} from 'react'
import {toKaruraXcmFee} from '../../config'
import {useAllTransferData} from '../../store'
import {useBridgePage} from '../../useBridgePage'
import {Button} from '../Button'
import {useKhalaBridgeFee} from '../KhalaToEthereumFee'

interface SubmitButtonProps extends ComponentProps<typeof Button> {
  onSubmit: (transferData: any) => void
}

export const SubmitButton: FC<SubmitButtonProps> = (props) => {
  const {onSubmit} = props
  const {
    currentAddress,
    isFromEthereum,
    isFromKhala,
    maxAmountDecimal,
    isToKarura,
  } = useBridgePage()
  const allTransferData = useAllTransferData()
  const ethereumBridgeFee = useEthereumBridgeFee()
  const khalaBridgeFee = useKhalaBridgeFee()
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
    } else if ((isFromEthereum || isToKarura) && !validateAddress(recipient)) {
      errorString = 'Need enter the correct recipient'
    } else if (!accountFrom) {
      errorString = 'Need login'
    } else if (
      isFromKhala &&
      !new RegExp(/0x[0-9a-fA-F]{40}/).test(recipient)
    ) {
      errorString = 'Need enter the correct recipient'
    } else if (
      (isFromKhala && !khalaBridgeFee.fee) ||
      (isFromEthereum && !ethereumBridgeFee)
    ) {
      errorString = 'Please wait fee check'
    } else if (new Decimal(amountTo).greaterThan(maxAmountDecimal)) {
      errorString = 'Insufficient balance'
    } else if (
      (isFromKhala &&
        khalaBridgeFee.fee &&
        new Decimal(amountTo).greaterThan(
          maxAmountDecimal.sub(khalaBridgeFee.fee)
        )) ||
      (isToKarura &&
        new Decimal(amountTo).greaterThan(maxAmountDecimal.sub(toKaruraXcmFee)))
    ) {
      errorString = 'Insufficient balance'
    } else if (
      (isFromKhala &&
        khalaBridgeFee.fee &&
        new Decimal(amountTo).lessThan(khalaBridgeFee.fee)) ||
      (isToKarura && new Decimal(amountTo).lessThan(toKaruraXcmFee))
    ) {
      errorString = 'The transaction amount should be greater than bridge fee'
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
