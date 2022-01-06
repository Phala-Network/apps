import React, {useState} from 'react'
import styled from 'styled-components'
import {Drawer, ANCHOR, SIZE} from 'baseui/drawer'
import MoreIcon from '../../../icons/more.svg'
import ExternalLink from '../../../icons/external_link.svg'
import {LineWrap} from '../../Navbar/styledComponent'

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
        <MoreIcon />
      </MoreButton>
      <Drawer
        isOpen={isOpen}
        autoFocus
        anchor={ANCHOR.bottom}
        size={SIZE.auto}
        closeable={false}
        onBackdropClick={() => setIsOpen(false)}
        overrides={{
          DrawerBody: {
            style: () => ({
              margin: 0,
            }),
          },
        }}
      >
        {LINKS.map(({name, link}) => (
          <LineWrap onClick={close} href={link} key={name} target="_blank">
            <ExternalName>{name}</ExternalName>
            <ExternalLink />
          </LineWrap>
        ))}
      </Drawer>
    </div>
  )
}

export default CheckMore
