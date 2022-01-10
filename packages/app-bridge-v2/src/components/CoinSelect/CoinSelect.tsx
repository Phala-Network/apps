import {Select} from 'baseui/select'
import {ComponentProps, FC} from 'react'
import {coins} from '../../config'
import {selectOverrides} from '../../style/selectOverrides'

export const CoinSelect: FC<ComponentProps<typeof Select>> = (props) => {
  return (
    <Select
      overrides={selectOverrides}
      options={coins}
      clearable={false}
      placeholder="Select Network"
      {...props}
    />
  )
}
