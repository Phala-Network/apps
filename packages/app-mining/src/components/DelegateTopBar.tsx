import {Block} from 'baseui/block'
import {Button} from 'baseui/button'
import {useLocation} from '@reach/router'
import {navigate} from 'gatsby'
import UpdateInfo from './UpdateInfo'

const DelegateTopBar = (): JSX.Element => {
  const {pathname} = useLocation()
  return (
    <Block display="flex" justifyContent="space-between">
      <Button
        kind="secondary"
        size="mini"
        onClick={() => navigate(`/v1${pathname}`)}
      >
        Go to Legacy Version
      </Button>
      <UpdateInfo />
    </Block>
  )
}

export default DelegateTopBar
