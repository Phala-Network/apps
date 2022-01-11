import {Select} from 'baseui/select'
import {ComponentProps, FC} from 'react'
import {coins} from '../../config'
import {selectOverrides} from '../../style/selectOverrides'
import {CoinSelectItem} from './CoinSelectItem'

export const CoinSelect: FC<ComponentProps<typeof Select>> = (props) => {
  const getLabel = ({option}: any) => {
    return <CoinSelectItem id={option.id} />
  }

  return (
    <Select
      overrides={selectOverrides}
      options={coins}
      clearable={false}
      placeholder="Select Coin"
      getOptionLabel={getLabel}
      getValueLabel={getLabel}
      {...props}
    />
  )
}
