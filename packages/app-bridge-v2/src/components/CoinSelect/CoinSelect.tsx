import {Select} from 'baseui/select'
import * as React from 'react'
import {ComponentProps, FC} from 'react'
import {coins} from '../../config'

export const CoinSelect: FC<ComponentProps<typeof Select>> = (props) => {
  const [value, setValue] = React.useState<any>([{label: 'Phala'}])

  return (
    <Select
      options={coins}
      clearable={false}
      value={value}
      placeholder="Select Network"
      onChange={(params) => setValue(params.value)}
      {...props}
    />
  )
}
