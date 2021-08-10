import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby-plugin-intl'

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const Link = styled(GatsbyLink).attrs({ activeClassName: 'active' })`
  font-family: Lato;
  font-weight: bold;
  font-size: 12px;
  color: #868686;
  text-decoration: none;
  margin-left: 16px;

  &.active {
    color: ${(props) => props.theme.colors.phala};
  }
`

const Links: React.FC = () => {
  return (
    <Wrapper>
      <Link to="/">Assets</Link>
      <Link to="/bridge/">Bridge</Link>
    </Wrapper>
  )
}

export default Links
