import {Block} from 'baseui/block'
import UpdateInfo from './UpdateInfo'

const StatusBarV2 = (): JSX.Element => {
  return (
    <Block
      display="flex"
      justifyContent="flex-end"
      flexWrap
      alignItems="center"
      marginTop="scale100"
      marginBottom="scale100"
    >
      <UpdateInfo />
    </Block>
  )
}

export default StatusBarV2
