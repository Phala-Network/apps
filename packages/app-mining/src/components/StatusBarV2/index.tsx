import {Block} from 'baseui/block'
import {useLocation} from '@reach/router'
import {navigate} from 'gatsby'
import UpdateInfo from './UpdateInfo'
import {StyledLink} from 'baseui/link'

const StatusBarV2 = (): JSX.Element => {
  const {pathname} = useLocation()
  return (
    <Block
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      marginTop="scale100"
      marginBottom="scale100"
    >
      <UpdateInfo />
      <StyledLink
        href="#"
        onClick={(e) => {
          e.preventDefault()
          navigate(`/v1${pathname}`)
        }}
      >
        Switch to Old Version
      </StyledLink>
    </Block>
  )
}

export default StatusBarV2
