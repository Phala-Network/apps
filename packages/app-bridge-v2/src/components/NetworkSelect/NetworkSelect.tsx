import {Select} from 'baseui/select'
import * as React from 'react'
import {ComponentProps, FC} from 'react'
import {networks} from '../../config'

export const NetworkSelect: FC<ComponentProps<typeof Select>> = (props) => {
  const [value, setValue] = React.useState<any>([{label: 'Phala'}])

  return (
    <Select
      overrides={{
        ControlContainer: {
          style: () => ({
            /* Bk 001 */
            backgroundColor: '#111111',
            color: 'white',
          }),
        },
        ClearIcon: {
          props: {
            overrides: {
              Svg: {
                style: () => ({
                  color: 'white',
                }),
              },
            },
          },
        },
      }}
      options={networks}
      clearable={false}
      value={value}
      placeholder="Select Network"
      onChange={(params) => setValue(params.value)}
      {...props}
    />
  )
}
