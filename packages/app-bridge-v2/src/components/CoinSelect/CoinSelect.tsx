import {Select} from 'baseui/select'
import {ComponentProps, FC} from 'react'
import {coins} from '../../config'
import {selectOverrides} from '../../style/selectOverrides'
import {CoinSelectItem} from './CoinSelectItem'

export const CoinSelect: FC<ComponentProps<typeof Select>> = (props) => {
  return (
    <Select
      overrides={selectOverrides}
      options={coins}
      clearable={false}
      placeholder="Select Coin"
      getOptionLabel={({option}: any) => <CoinSelectItem id={option.id} />}
      getValueLabel={({option}: any) => (
        <CoinSelectItem id={option.id} isValue={true} />
      )}
      {...props}
    />
  )
}
