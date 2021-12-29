import {Link as GatsbyLink} from 'gatsby'
import styled from 'styled-components'
import {StatefulPopover, PLACEMENT} from 'baseui/popover'
import MoreIcon from '../../icons/more.svg'
import ExternalLink from '../../icons/external_link.svg'

const MoreButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  width: 36px;
  height: 36px;
  background-color: #fff;
  transition: all 0.2s;

  :hover,
  :focus {
    background: #cecece;
  }
`

const Link = styled(GatsbyLink)`
  color: #111111;
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
  border-bottom: 1px solid #cecece;

  :hover {
    background-color: #d1ff52;
  }
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
    link: 'https://discord.com/invite/phala',
  },
  {
    name: 'Governance',
    link: 'https://khala.subsquare.io/',
  },
]

const CheckMore = (): JSX.Element => {
  return (
    <StatefulPopover
      content={({close}) => (
        <>
          <Link
            onClick={() => {
              close
            }}
            to="/analytics/"
          >
            Analytics
          </Link>
          {LINKS.map(({name, link}) => (
            <LineWrap
              onClick={() => {
                close
              }}
              href={link}
              key={name}
              target="_blank"
            >
              <span>{name}</span>
              <ExternalLink />
            </LineWrap>
          ))}
        </>
      )}
      placement={PLACEMENT.bottom}
      showArrow
      overrides={{
        Arrow: {
          style: {
            outline: `#aad829 solid`,
            backgroundColor: '#aad829',
          },
        },
        Body: {
          style: {
            outline: `1px #aad829 solid`,
            backgroundColor: '#eeeeee',
            boxShadow: 'none',
            marginRight: '20px',
            zIndex: 200,
          },
        },
      }}
    >
      <MoreButton>
        <MoreIcon />
      </MoreButton>
    </StatefulPopover>
  )
}

export default CheckMore
