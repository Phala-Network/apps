import { changeLocale, IntlContext } from 'gatsby-plugin-intl'
import React, { useContext } from 'react'
import styled from 'styled-components'

const Text = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 9px;
  line-height: 11px;
  color: #868686;
`

const Lang = styled.span`
  color: #bbff00;
  cursor: pointer;
`

const LangSwitch: React.FC = () => {
  const { locale } = useContext(IntlContext)
  const langSwitch =
    locale === 'en' ? (
      <Lang onClick={() => changeLocale('zh')}>中文(中国)</Lang>
    ) : (
      <Lang onClick={() => changeLocale('en')}>English</Lang>
    )

  return <Text>Available in: {langSwitch}</Text>
}

export default LangSwitch
