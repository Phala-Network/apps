import {InputNumber} from '@phala/react-components'
import {ComponentProps, FC} from 'react'

export const AmountInput: FC<ComponentProps<typeof InputNumber>> = (props) => {
  return (
    <InputNumber
      size="large"
      min={0.00000001}
      placeholder="Amount"
      {...props}
    />
  )
}
