import {Input} from 'baseui/input'
import {ComponentProps, FC} from 'react'

export const AddressInput: FC<ComponentProps<typeof Input>> = (props) => {
  return <Input placeholder="Wallet address" clearOnEscape {...props} />
}
