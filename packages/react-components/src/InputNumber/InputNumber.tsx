import {InputNumberProps} from 'rc-input-number'
import React from 'react'
import {Input, InputProps} from '../Input'

type Props = InputProps & Omit<InputNumberProps<number>, 'size'>

export const InputNumber: React.FC<Props> = (props) => {
  const {size, ...others} = props

  return <Input size={size} {...others} type="number"></Input>
}
