import {useTranslation} from '@phala/react-i18n'
import React from 'react'
import styled from 'styled-components'
import Feedback from './Feedback'
import Links from './Links'
import Logo from './Logo'
import bg from './sidebar.jpg'

const SideNavWrap = styled.div`
  background-image: url(${bg});
  background-size: 100% auto;
  width: 240px;
  padding: 60px 30px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  box-shadow: 12px 16px 0px 0px #cccccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Header = styled.div``

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  align-items: flex-start;
`

const ExternalLink = styled.a`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 30px;
  display: flex;
  align-items: center;
  color: #868686;
  cursor: pointer;

  &:hover {
    text-decoration-line: underline;
    color: white;
  }
`

const SideNav: React.FC = () => {
  const {t} = useTranslation()

  const LINKS = [
    {
      name: 'Phala.network',
      link: 'https://phala.network',
    },
    {
      name: t('Wiki'),
      link: 'https://wiki.phala.network',
    },
    {
      name: t('Forum'),
      link: 'https://forum.phala.network/t/topic/2450/2',
    },
    {
      name: t('Discord'),
      link: 'https://discord.gg/kpYj9GWjwN',
    },
    {
      name: 'Governance',
      link: 'https://khala.subsquare.io/',
    },
  ]

  return (
    <SideNavWrap>
      <Header>
        <Logo></Logo>

        <Links></Links>
      </Header>

      <Footer>
        {LINKS.map((link) => {
          return (
            <ExternalLink href={link.link} key={link.name} target="_blank">
              {link.name}
            </ExternalLink>
          )
        })}

        <Feedback>
          <ExternalLink>{t('Feedback')}</ExternalLink>
        </Feedback>

        {/* <LangSwitch></LangSwitch> */}
      </Footer>
    </SideNavWrap>
  )
}

export default React.memo(SideNav)
