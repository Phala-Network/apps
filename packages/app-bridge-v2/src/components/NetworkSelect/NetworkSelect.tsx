import {Select} from 'baseui/select'
import {ComponentProps, FC} from 'react'
import {networks} from '../../config'
import {NetworkSelectItem} from './NetworkSelectItem'

export const NetworkSelect: FC<ComponentProps<typeof Select>> = (props) => {
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
      value={props.value}
      getOptionLabel={getLabel}
      {...props}
    />
  )
}
