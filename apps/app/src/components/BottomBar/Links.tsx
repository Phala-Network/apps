import {Link as GatsbyLink} from 'gatsby'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;

  a {
    font-family: Montserrat;
    font-style: normal;
    font-size: 16px;
    line-height: 16px;
    color: #111111;
    text-decoration: none;
    margin-left: 30px;

    &:hover,
    &.active {
      color: #aad829;
    }
  }
`

const Links: React.FC = () => {
  return (
    <Wrapper>
      <GatsbyLink activeClassName="active" to="/">
        Dashboard
      </GatsbyLink>
      <a href="https://subbridge.io" target="_blank" rel="noopener">
        SubBridge
      </a>
      <GatsbyLink
        activeClassName="active"
        to="/delegate/"
        partiallyActive={true}
      >
        Delegate
      </GatsbyLink>
    </Wrapper>
  )
}

export default Links
