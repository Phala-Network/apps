import {Block} from 'baseui/block'
import {StyledLink} from 'baseui/link'
import {useLocation} from '@reach/router'
import {navigate} from 'gatsby'

const StatusBar = (): JSX.Element => {
  const {pathname} = useLocation()
  return (
    <Block
      display="flex"
      justifyContent="flex-end"
      marginTop="scale100"
      marginBottom="scale100"
    >
      <StyledLink
        href="#"
        onClick={(e) => {
          e.preventDefault()
          navigate(`${pathname.replace('/v1', '')}`)
        }}
      >
        Switch to New Version
      </StyledLink>
    </Block>
  )
}

export default StatusBar
