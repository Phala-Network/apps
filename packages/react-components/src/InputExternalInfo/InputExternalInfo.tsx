import {useSSR} from '@phala/react-hooks'
import {Decimal} from 'decimal.js'
import React, {ComponentProps} from 'react'
import {BalanceLabel} from '../BalanceLabel'
import {Label, Type, Value} from './styledComponents'

export type InputExternalInfoProps = {
  label?: string
  value?: number | string | Decimal
  type?: string
} & ComponentProps<'div'>

export const InputExternalInfo: React.FC<InputExternalInfoProps> = (props) => {
  const {label, value, type, ...others} = props
  const {isServer} = useSSR()

  if (isServer) return null

  return (
    <div style={{textAlign: 'right'}} {...others}>
      {label && <Label>{label}: </Label>}
      {value && (
        <Value>
          <BalanceLabel value={new Decimal(value)} />
        </Value>
      )}
      {type && <Type>{type}</Type>}
    </div>
  )
}
