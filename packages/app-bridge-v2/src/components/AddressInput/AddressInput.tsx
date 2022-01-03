import {Input} from 'baseui/input'
import {useState} from 'react'

export const AddressInput = () => {
  const [value, setValue] = useState('Hello')
  return (
    <Input
      value={value}
      onChange={(e: any) => setValue(e.target?.value)}
      placeholder="Wallet address"
      clearOnEscape
    />
  )
}
