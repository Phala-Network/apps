import {useTranslation} from '@phala/react-i18n'
import {changeLocale, IntlContext} from 'gatsby-plugin-intl'
import React, {useContext} from 'react'
import styled from 'styled-components'

const Text = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  margin-top: 6px;
  color: #868686;
`

const Lang = styled.span`
  color: #bbff00;
  cursor: pointer;
`

const LangSwitch: React.FC = () => {
  const {i18n} = useTranslation()
  const {locale} = useContext(IntlContext)
  const langSwitch =
    locale === 'en' ? (
      <Text>
        可用语言:
        <Lang
          onClick={() => {
            i18n.changeLanguage('zh')
            changeLocale('zh')
          }}
        >
          中文(中国)
        </Lang>
      </Text>
    ) : (
      <Text>
        Available in:
        <Lang
          onClick={() => {
            i18n.changeLanguage('en')
            changeLocale('en')
          }}
        >
          English
        </Lang>
      </Text>
    )

  return langSwitch
}

export default LangSwitch
