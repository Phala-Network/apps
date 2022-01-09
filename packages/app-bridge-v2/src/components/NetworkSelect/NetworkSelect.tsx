import {Select} from 'baseui/select'
import {ComponentProps, FC} from 'react'
import {Network, networks} from '../../config'
import {NetworkSelectItem} from './NetworkSelectItem'

type NetworkSelectProps = Omit<ComponentProps<typeof Select>, 'value'> & {
  value: Network[]
}

export const NetworkSelect: FC<NetworkSelectProps> = (props) => {
  const getLabel = ({option}: any) => {
    return <NetworkSelectItem id={option.id} />
  }

  return (
    <Select
      overrides={{
        Dropdown: {
          style: () => ({
            backgroundColor: 'black',
            padding: 0,
            color: 'white',
          }),
        },
      }}
      options={networks}
      clearable={false}
      placeholder="Select Network"
      getOptionLabel={getLabel}
      {...props}
    />
  )
}
