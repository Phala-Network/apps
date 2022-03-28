import Decimal from 'decimal.js'
import {VFC} from 'react'
import {useAllTransferData} from '../../store'
import {InformationDetailItem} from '../InformationDetailItem'

export const CurrentTransferInformationDetailItems: VFC<{
  bridgeFee?: Decimal | number
}> = ({bridgeFee}) => {
  const allTransferData = useAllTransferData()

  let toAmount = allTransferData.amountDecimal

  // HACK: bridgeFee should be included in amount
  if (bridgeFee) {
    if (
      allTransferData.fromNetwork === 'Khala' ||
      allTransferData.fromNetwork === 'Karura'
    ) {
      toAmount = toAmount.minus(bridgeFee)
    }
  }

  return (
    <div>
      <InformationDetailItem
        label="From"
        address={allTransferData.fromAddress}
        network={allTransferData.fromNetwork}
        coin={allTransferData.fromCoin}
        amount={allTransferData.amountDecimal.toString()}
      />
      <InformationDetailItem
        label="To"
        address={allTransferData.toAddress}
        network={allTransferData.toNetwork}
        coin={allTransferData.toCoin}
        amount={toAmount.toString()}
      />
    </div>
  )
}
