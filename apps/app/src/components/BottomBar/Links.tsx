import {Link} from 'gatsby'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;

  a {
    font-family: Montserrat;
    font-size: 14px;
    line-height: 14px;
    color: #111111;
    text-decoration: none;
    margin-left: 16px;

    &:hover,
    &.active {
      color: #aad829;
    }
  }
`

const Links: React.FC = () => {
  return (
    <Wrapper>
      <Link activeClassName="active" to="/">
        Dashboard
      </Link>
      <a href="https://subbridge.io" target="_blank" rel="noopener">
        SubBridge
      </a>
      <Link activeClassName="active" to="/delegate/" partiallyActive={true}>
        Delegate
      </Link>
    </Wrapper>
  )
}

export default Links
