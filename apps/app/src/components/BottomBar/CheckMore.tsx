import {ANCHOR, Drawer, SIZE} from 'baseui/drawer'
import {Link} from 'gatsby'
import React, {useState} from 'react'
import styled from 'styled-components'
import ExternalLink from '../../icons/external_link.svg'
import MoreIcon from '../../icons/more.svg'
import {LineWrap} from '../Navbar/styledComponent'

const StyledGatsbyLink = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  height: 48px;
  padding: 16px 43px 16px 21px;
  font-family: Montserrat;
  font-style: normal;
  font-size: 16px;
  line-height: 16px;
  color: #111111;
  outline: none;

  :not(:last-of-type) {
    border-bottom: 1px solid #cecece;
  }

  :hover {
    background-color: #d1ff52;
  }
`

const MoreButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  width: 43px;
  height: 43px;
  background-color: #fff;
  transition: all 0.2s;
  margin-right: 15px;

  :hover,
  :focus {
    background: #d1ff52;
  }
`

const ExternalName = styled.span`
  flex: 1;
  text-align: center;
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

const CheckMore: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <MoreButton onClick={() => setIsOpen(true)}>
        <MoreIcon width="43" height="43" />
      </MoreButton>
      <Drawer
        isOpen={isOpen}
        autoFocus
        animate={true}
        anchor={ANCHOR.bottom}
        size={SIZE.auto}
        closeable={false}
        onBackdropClick={() => setIsOpen(false)}
        overrides={{
          Root: {
            style: () => ({
              zIndex: 999999,
            }),
          },
          DrawerBody: {
            style: () => ({
              marginTop: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }),
          },
        }}
      >
        <StyledGatsbyLink
          to="/mining/"
          onClick={() => {
            setIsOpen(false)
          }}
        >
          <ExternalName>Mining</ExternalName>
        </StyledGatsbyLink>
        {LINKS.map(({name, link}) => (
          <LineWrap
            onClick={() => setIsOpen(false)}
            href={link}
            key={name}
            target="_blank"
          >
            <ExternalName>{name}</ExternalName>
            <ExternalLink />
          </LineWrap>
        ))}
      </Drawer>
    </div>
  )
}

export default CheckMore
