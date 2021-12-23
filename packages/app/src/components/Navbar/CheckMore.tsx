import {Link as GatsbyLink} from 'gatsby'
import styled from 'styled-components'
import MoreIcon from '../../icons/more.svg'
import ExternalLink from '../../icons/external_link.svg'

const Link = styled(GatsbyLink)`
  color: #111111;
`

const MoreButton = styled.div`
  cursor: pointer;
  margin-right: 85px;
`

const LineWrap = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 175px;
  height: 47px;
  padding: 14px 23px 14px 21px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;

  :not(:last-of-type) {
    border-bottom: 1px solid #cecece;
  }

  :hover {
    background-color: #d1ff52;
  }

  span {
    color: #111111;
    flex: 1;
  }
`
const Popover = styled.div`
  display: inline-block;
  position: relative;

  .popover-container {
    opacity: 0;
    position: absolute;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.2s;
    z-index: 300;
    left: 50%;
    top: 100%;
    background-color: #eeeeee;
    border: 1px solid #aad829;
  }

  *:focus + .popover-container,
  :hover .popover-container {
    display: block;
    opacity: 1;
    transform: translate(-100%, 0) scale(1);
  }
`

const CheckMore = (): JSX.Element => {
  const LINKS = [
    {
      name: 'About',
      link: 'https://phala.network',
    },
    {
      name: 'Wiki',
      link: 'https://wiki.phala.network',
    },
    {
      name: 'Forum',
      link: 'https://forum.phala.network/t/topic/2450/2',
    },
    {
      name: 'Discord',
      link: 'https://discord.gg/kpYj9GWjwN',
    },
    {
      name: 'Governance',
      link: 'https://khala.subsquare.io/',
    },
  ]

  return (
    <Popover>
      <MoreButton>
        <MoreIcon />
      </MoreButton>
      <div className="popover-container">
        <LineWrap>
          <Link to="/analytics/">Dashboard</Link>
        </LineWrap>
        {LINKS.map(({name, link}) => (
          <LineWrap href={link} key={name} target="_blank">
            <span>{name}</span>
            <ExternalLink />
          </LineWrap>
        ))}
      </div>
    </Popover>
  )
}

export default CheckMore
