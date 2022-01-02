import {Select} from 'baseui/select'
import * as React from 'react'
import {networks} from '../../config'

export const NetworkSelect = () => {
  const [value, setValue] = React.useState<any>([{label: 'Phala'}])

  return (
    <Select
      options={networks}
      clearable={false}
      value={value}
      placeholder="Select Network"
      onChange={(params) => setValue(params.value)}
    />
  )
}
