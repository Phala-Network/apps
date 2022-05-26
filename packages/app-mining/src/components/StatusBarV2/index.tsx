import {useLocation} from '@reach/router'
import {Block} from 'baseui/block'
import {StyledLink} from 'baseui/link'
import {navigate} from 'gatsby'
import UpdateInfo from './UpdateInfo'

const StatusBarV2 = (): JSX.Element => {
  const {pathname} = useLocation()
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
      <StyledLink
        $style={{
          height: '34px',
          lineHeight: '34px',
        }}
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
