import {Select} from 'baseui/select'
import {ComponentProps, FC} from 'react'
import {Network, networks} from '../../config'
import {selectOverrides} from '../../style/selectOverrides'
import {NetworkSelectItem} from './NetworkSelectItem'

type NetworkSelectProps = Omit<ComponentProps<typeof Select>, 'value'> & {
  value: Network[]
}

export const NetworkSelect: FC<NetworkSelectProps> = (props) => {
  return (
    <Select
      overrides={selectOverrides}
      options={networks}
      clearable={false}
      placeholder="Select Network"
      getOptionLabel={({option}: any) => <NetworkSelectItem id={option.id} />}
      getValueLabel={({option}: any) => (
        <NetworkSelectItem id={option.id} isValue={true} />
      )}
      {...props}
    />
  )
}
