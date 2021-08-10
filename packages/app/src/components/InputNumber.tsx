import React from 'react'
import Input, { InputProps } from './Input'
import { InputNumberProps } from 'rc-input-number'

type Props = InputProps & Omit<InputNumberProps<number>, 'size'>

const InputNumber: React.FC<Props> = (props) => {
  const { size, ...others } = props

  return <Input size={size} {...others} type="number"></Input>
}

export default InputNumber
