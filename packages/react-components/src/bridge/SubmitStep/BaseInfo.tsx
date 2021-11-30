import {TransactionInfo} from '@phala/app-types'
import React from 'react'
import {Address, AmountInfo, InfoTitle, Spacer} from '../..'
import {StepProps} from '../BridgeProcess'
import FormItem from '../FormItem'
import FormLayout from '../FormLayout'

type Props = {
  onPrev?(): void
  onSubmit?(): void
  data?: TransactionInfo
  fromTooltip?: string
} & StepProps

const BaseInfo: React.FC<Props> = (props) => {
  const {layout, data, fromTooltip} = props
  const {from, to} = data || {}

  return (
    <FormLayout layout={layout}>
      <FormItem>
        <InfoTitle>From</InfoTitle>
        <AmountInfo
          tooltip={fromTooltip}
          network={from?.network}
          amount={from?.amount?.toString()}
          type={from?.type}>
          <Address>{from?.address}</Address>
        </AmountInfo>
      </FormItem>

      <Spacer></Spacer>

      <FormItem>
        <InfoTitle>To</InfoTitle>
        <AmountInfo
          network={to?.network}
          amount={to?.amount?.toString()}
          type={to?.type}>
          <Address>{to?.address}</Address>
        </AmountInfo>
      </FormItem>
    </FormLayout>
  )
}

export default BaseInfo
