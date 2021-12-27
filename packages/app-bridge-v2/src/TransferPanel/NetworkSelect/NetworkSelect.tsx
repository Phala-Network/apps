import {Select} from 'baseui/select'
import * as React from 'react'

export const NetworkSelect = () => {
  const [value, setValue] = React.useState<any>([
    {label: 'AntiqueWhite', id: '#FAEBD7'},
  ])

  return (
    <Select
      options={[
        {label: 'AliceBlue', id: '#F0F8FF'},
        {label: 'AntiqueWhite', id: '#FAEBD7'},
        {label: 'Aqua', id: '#00FFFF'},
        {label: 'Aquamarine', id: '#7FFFD4'},
        {label: 'Azure', id: '#F0FFFF'},
        {label: 'Beige', id: '#F5F5DC'},
      ]}
      clearable={false}
      value={value}
      placeholder="Select color"
      onChange={(params) => setValue(params.value)}
    />
  )
}
