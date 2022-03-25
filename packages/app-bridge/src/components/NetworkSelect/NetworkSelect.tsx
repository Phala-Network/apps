import {Select} from 'baseui/select'
import {ComponentProps, FC, useMemo} from 'react'
import {Network, networks} from '../../config'
import {useFromNetwork} from '../../store'
import {selectOverrides} from '../../style/selectOverrides'
import {NetworkSelectItem} from './NetworkSelectItem'

type NetworkSelectProps = Omit<ComponentProps<typeof Select>, 'value'> & {
  value: Network[]
  kind?: 'from' | 'to'
}

export const NetworkSelect: FC<NetworkSelectProps> = (props) => {
  const [fromNetwork] = useFromNetwork()
  const options = useMemo(() => {
    return networks.filter((network) => {
      const {id} = network
      const fromId = fromNetwork[0]?.id
      // HACK: hardcode for now
      return (
        (props.kind === 'from' && id !== 'Karura') ||
        (props.kind === 'to' &&
          id !== fromId &&
          ((fromId === 'Ethereum' && id === 'Khala') || fromId === 'Khala'))
      )
    })
  }, [props.kind, fromNetwork])
  return (
    <Select
      overrides={selectOverrides}
      options={options}
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
