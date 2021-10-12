import React from 'react'
import DEFAULT_VALUE from './DEFAULT_VALUE'
import ExchangeIcon from './ExchangeIcon'
import From from './From'
import To from './To'

export type TradeTypeSelectValue = {
  from: Target
  to: Target
}

export type Target = {
  network: string
  type: string
  icon: React.ReactNode
  color: string
}

export type TradeTypeSelectProps = {
  disableSelect?: boolean
  value?: TradeTypeSelectValue
  onChange?: (value: TradeTypeSelectValue) => void
} & Omit<React.ComponentProps<'div'>, 'onChange'>

const index: React.FC<TradeTypeSelectProps> = (props) => {
  const {
    onChange,
    value = DEFAULT_VALUE,
    disableSelect = false,
    ...others
  } = props

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const exchange = () => {
    const newValue: TradeTypeSelectValue = {
      from: value.to,
      to: value.from,
    }

    onChange?.(newValue)
  }

  return (
    <div {...others}>
      <From disableSelect={disableSelect} value={value?.from}></From>
      <ExchangeIcon onClick={exchange}></ExchangeIcon>
      <To disableSelect={disableSelect} value={value?.to}></To>
    </div>
  )
}

export default index
