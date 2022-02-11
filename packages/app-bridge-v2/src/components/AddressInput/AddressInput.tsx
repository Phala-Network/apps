import {Input} from 'baseui/input'
import {ComponentProps, FC} from 'react'

type AddressInputProps = ComponentProps<typeof Input> & {
  styleOverrides?: any
}

export const AddressInput: FC<AddressInputProps> = (props) => {
  const {styleOverrides = {}, ...others} = props

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
            ...styleOverrides,
          },
        },
      }}
      {...others}
    />
  )
}
