import {FC} from 'react'
import {useAllTransferData} from '../../store'
import {InformationDetailItem} from '../InformationDetailItem'

export const CurrentTransferInformationDetailItems: FC = () => {
  const allTransferData = useAllTransferData()

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
        amount={allTransferData.amountDecimal.toString()}
      />
    </div>
  )
}
