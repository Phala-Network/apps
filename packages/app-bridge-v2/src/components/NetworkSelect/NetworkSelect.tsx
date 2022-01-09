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
        ValueContainer: {
          style: {
            padding: 0,
          },
        },
        ControlContainer: {
          style: {
            padding: 0,
            height: 48,
            fontSize: 16,
            backgroundColor: 'black',
            color: 'white',
          },
        },
        Dropdown: {
          style: () => ({
            backgroundColor: 'black',
            padding: 0,
            color: 'white',
          }),
        },
        DropdownListItem: {
          style: {
            height: 48,
            lineHeight: '48px',
            fontSize: 16,
            padding: 0,
            textAlign: 'center',
            color: 'white',
            backgroundColor: 'black',
            ':hover': {
              backgroundColor: '#D1FF52',
              color: '#111111',
            },
          },
        },
        SelectArrow: {
          props: {
            style: {
              fill: 'white',
            },
          },
        },
      }}
      options={networks}
      clearable={false}
      placeholder="Select Network"
      getOptionLabel={getLabel}
      getValueLabel={getLabel}
      {...props}
    />
  )
}
