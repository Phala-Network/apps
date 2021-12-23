import {Link as GatsbyLink} from 'gatsby'
import styled from 'styled-components'

const Wrapper = styled.div`
  flex: 1;
  display: flex;
`

const Link = styled(GatsbyLink).attrs({activeClassName: 'active'})`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 16px;
  color: #111111;
  text-decoration: none;
  margin-left: 72px;

  &.active {
    color: #aad829;
  }
`

const Links: React.FC = () => {
  return (
    <Wrapper>
      <Link to="/">Dashboard</Link>
      <Link to="/bridge/">Bridge</Link>
      <Link to="/delegate/">Delegate</Link>
      <Link to="/mining/">Mining</Link>
    </Wrapper>
  )
}

export default Links
