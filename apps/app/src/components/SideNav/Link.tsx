import {Link as GatsbyLink} from 'gatsby'
import styled from 'styled-components'

const Link = styled(GatsbyLink).attrs({activeClassName: 'active'})`
  box-sizing: border-box;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 40px;
  padding-left: 16px;
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  color: #868686;
  margin: 12px 0;
  display: block;
  border: 1px solid transparent;
  cursor: pointer;
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
