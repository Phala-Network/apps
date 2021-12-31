import {Block} from 'baseui/block'
import {StyledLink} from 'baseui/link'
import {useLocation} from '@reach/router'
import {navigate} from 'gatsby'

const DelegateTopBar = (): JSX.Element => {
  const {pathname} = useLocation()
  return (
    <Block display="flex" justifyContent="flex-end" padding="10px 0">
      <StyledLink
        href="#"
        onClick={(e) => {
          e.preventDefault()
          navigate(`${pathname.replace('/v1', '')}`)
        }}
        $style={{
          margin: '0 10px',
        }}
      >
        Switch to New Version
      </StyledLink>
    </Block>
  )
}

export default DelegateTopBar
