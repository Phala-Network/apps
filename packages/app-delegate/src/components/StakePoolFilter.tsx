import {Input} from '@phala/react-components'

const StakePoolFilter = ({pid, setPid}) => {
  return <Input value={pid} onChange={setPid}></Input>
}

export default StakePoolFilter
