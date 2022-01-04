import {Input} from 'baseui/input'
import {ComponentProps, FC} from 'react'

export const AmountInput: FC<ComponentProps<typeof Input>> = (props) => {
  return <Input type="number" placeholder="Amount" clearOnEscape {...props} />
}
