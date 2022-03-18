import Decimal from 'decimal.js'
import {VFC} from 'react'
import {useAllTransferData} from '../../store'
import {InformationDetailItem} from '../InformationDetailItem'

export const CurrentTransferInformationDetailItems: VFC<{
  bridgeFee?: Decimal
}> = ({bridgeFee}) => {
  const allTransferData = useAllTransferData()

  // HACK: bridgeFee should be included in amount
  const toAmount =
    bridgeFee &&
    allTransferData.fromNetwork === 'Khala' &&
    allTransferData.toNetwork === 'Ethereum'
      ? allTransferData.amountDecimal.minus(bridgeFee)
      : allTransferData.amountDecimal

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
