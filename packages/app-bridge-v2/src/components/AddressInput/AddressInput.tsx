import {Input} from 'baseui/input'
import {ComponentProps, FC} from 'react'

export const AddressInput: FC<ComponentProps<typeof Input>> = (props) => {
  return (
    <Input
      placeholder="Wallet address"
      clearOnEscape
      overrides={{
        Root: {
          style: {
            height: '56px',
            borderLeftWidth: '0',
            borderRightWidth: '0',
            borderTopWidth: '0',
            borderBottomWidth: '0',
          },
        },
      }}
      {...props}
    />
  )
}
