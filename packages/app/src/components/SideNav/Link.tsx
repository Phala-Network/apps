import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby-plugin-intl'

const Link = styled(GatsbyLink).attrs({ activeClassName: 'active' })`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  color: #868686;
  padding: 8px 16px;
  margin: 8px 0;
  display: block;
  border: 1px solid transparent;
  cursor: pointer;
  max-width: 120px;
  text-decoration: none;
  transition: all 0.2s linear;
  position: relative;

  &:hover {
    color: #c9c9c9;
  }

  &.active {
    color: ${(props) => props.theme.colors.phala};
  }
`

export default Link
