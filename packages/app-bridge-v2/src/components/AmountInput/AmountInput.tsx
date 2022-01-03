import {Input} from 'baseui/input'
import {useState} from 'react'

export const AmountInput = () => {
  const [value, setValue] = useState(0)
  return (
    <Input
      type="number"
      value={value}
      onChange={(e: any) => setValue(e.target?.value)}
      placeholder="Amount"
      clearOnEscape
    />
  )
}
