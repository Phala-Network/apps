import {Link as GatsbyLink} from 'gatsby'
import styled from 'styled-components'
import {down} from 'styled-breakpoints'

const Wrapper = styled.div`
  flex: 1;
  display: flex;
`

const Link = styled(GatsbyLink).attrs({activeClassName: 'active'})`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #111111;
  text-decoration: none;
  margin-left: 56px;

  &:hover {
    color: #aad829;
  }

  &.active {
    color: #aad829;
  }

  ${down('lg')} {
    font-size: 14px;
    line-height: 14px;
    margin-left: 20px;
  }

  @media screen and (max-width: 1300px) {
    margin-left: 25px;
  }
`

const Links: React.FC = () => {
  return (
    <Wrapper>
      <Link to="/">Dashboard</Link>
      <Link to="/bridge/">SubBridge</Link>
      <Link to="/delegate/" partiallyActive={true}>
        Delegate
      </Link>
      <Link to="/mining/">Mining</Link>
    </Wrapper>
  )
}

export default Links
