import {Select} from 'baseui/select'
import {ComponentProps, FC} from 'react'
import {networks} from '../../config'

export const NetworkSelect: FC<ComponentProps<typeof Select>> = (props) => {
  return (
    <Select
      // overrides={{
      //   ControlContainer: {
      //     style: () => ({
      //       /* Bk 001 */
      //       backgroundColor: '#111111',
      //       color: 'white',
      //     }),
      //   },
      //   ClearIcon: {
      //     props: {
      //       overrides: {
      //         Svg: {
      //           style: () => ({
      //             color: 'white',
      //           }),
      //         },
      //       },
      //     },
      //   },
      // }}
      options={networks}
      clearable={false}
      placeholder="Select Network"
      value={props.value}
      {...props}
    />
  )
}
