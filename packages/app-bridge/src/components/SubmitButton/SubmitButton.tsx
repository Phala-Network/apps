import {
  useErc20AssetHandlerAllowanceQuery,
  useEthereumBridgeFee,
} from '@phala/react-libs'
import {validateAddress} from '@phala/utils'
import {toaster} from 'baseui/toast'
import Decimal from 'decimal.js'
import {ComponentProps, FC} from 'react'
import {toKaruraXcmFee, toKhalaXcmFee} from '../../config'
import {useAllTransferData} from '../../store'
import {useBridgePage} from '../../useBridgePage'
import {Button} from '../Button'
import {useKhalaBridgeFee} from '../KhalaToEthereumFee'

interface SubmitButtonProps extends ComponentProps<typeof Button> {
  onSubmit: (transferData: any) => void
}

export const SubmitButton: FC<SubmitButtonProps> = (props) => {
  const {onSubmit} = props
  const {currentAddress, maxAmountDecimal} = useBridgePage()
  const allTransferData = useAllTransferData()
  const ethereumBridgeFee = useEthereumBridgeFee()
  const khalaBridgeFee = useKhalaBridgeFee()
  const {data: allowance} = useErc20AssetHandlerAllowanceQuery(
    allTransferData.fromNetwork === 'Ethereum'
      ? allTransferData.fromAddress
      : undefined
  )
  const {amount, toAddress, fromNetwork, toNetwork, toBlockchainType} =
    allTransferData

  const onSubmitCheck = () => {
    const accountFrom = currentAddress
    const amountTo = amount
    const recipient = toAddress
    let errorString = ''

    if (!amountTo || amountTo <= 0) {
      errorString = 'Need enter amount'
    } else if (!recipient) {
      errorString = 'Need enter recipient'
    } else if (toBlockchainType === 'polkadot' && !validateAddress(recipient)) {
      errorString = 'Need enter the correct recipient'
    } else if (!accountFrom) {
      errorString = 'Need login'
    } else if (
      toBlockchainType === 'ethereum' &&
      !new RegExp(/0x[0-9a-fA-F]{40}/).test(recipient)
    ) {
      errorString = 'Need enter the correct recipient'
    } else if (
      (fromNetwork === 'Khala' &&
        toNetwork === 'Ethereum' &&
        !khalaBridgeFee.fee) ||
      (fromNetwork === 'Ethereum' &&
        toNetwork === 'Khala' &&
        !ethereumBridgeFee)
    ) {
      errorString = 'Please wait fee check'
    } else if (
      (fromNetwork === 'Khala' &&
        toNetwork === 'Ethereum' &&
        new Decimal(amountTo).greaterThan(maxAmountDecimal)) ||
      (fromNetwork === 'Khala' &&
        toNetwork === 'Karura' &&
        new Decimal(amountTo).greaterThan(
          maxAmountDecimal.sub(toKaruraXcmFee)
        )) ||
      (fromNetwork === 'Karura' &&
        toNetwork === 'Khala' &&
        new Decimal(amountTo).greaterThan(
          maxAmountDecimal.sub(toKhalaXcmFee)
        )) ||
      (fromNetwork === 'Ethereum' &&
        toNetwork === 'Khala' &&
        new Decimal(amountTo).greaterThan(maxAmountDecimal))
    ) {
      errorString = 'Insufficient balance'
    } else if (
      (fromNetwork === 'Khala' &&
        toNetwork === 'Ethereum' &&
        khalaBridgeFee.fee &&
        new Decimal(amountTo).lessThanOrEqualTo(khalaBridgeFee.fee)) ||
      (fromNetwork === 'Khala' &&
        toNetwork === 'Karura' &&
        new Decimal(amountTo).lessThanOrEqualTo(toKaruraXcmFee)) ||
      (fromNetwork === 'Karura' &&
        toNetwork === 'Khala' &&
        new Decimal(amountTo).lessThanOrEqualTo(toKhalaXcmFee))
    ) {
      errorString = 'The transaction amount should be greater than bridge fee'
    } else if (fromNetwork === 'Ethereum' && (!allowance || allowance.lte(0))) {
      errorString = 'Please approve first'
    }
    if (errorString) {
      toaster.negative(errorString, {})
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
