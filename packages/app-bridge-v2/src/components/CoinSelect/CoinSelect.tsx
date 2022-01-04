import {Select} from 'baseui/select'
import {ComponentProps, FC} from 'react'
import {coins} from '../../config'

export const CoinSelect: FC<ComponentProps<typeof Select>> = (props) => {
  return (
    <Select
      options={coins}
      clearable={false}
      placeholder="Select Network"
      {...props}
    />
  )
}
