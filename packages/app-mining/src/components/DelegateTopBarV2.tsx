import {Block} from 'baseui/block'
import {useLocation} from '@reach/router'
import {navigate} from 'gatsby'
import UpdateInfo from './UpdateInfo'
import {StyledLink} from 'baseui/link'

const DelegateTopBarV2 = (): JSX.Element => {
  const {pathname} = useLocation()
  return (
    <Block display="flex" justifyContent="flex-end" alignItems="center">
      <UpdateInfo />
      <StyledLink
        href="#"
        onClick={(e) => {
          e.preventDefault()
          navigate(`/v1${pathname}`)
        }}
        $style={{
          margin: '0 10px',
        }}
      >
        Switch to Old Version
      </StyledLink>
    </Block>
  )
}

export default DelegateTopBarV2
