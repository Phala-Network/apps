import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import React, {FC} from 'react'
import {
  I18nextProvider as Provider,
  initReactI18next,
  useTranslation,
} from 'react-i18next'
import {resources} from './locales'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: true,
    keySeparator: false,
    interpolation: {escapeValue: false},
    resources,
    detection: {
      order: ['navigator'],
    },
  })

export {useTranslation}
export {i18next}
export const t = i18next.t.bind(i18next)
export const I18nextProvider: FC = (props) => {
  return React.createElement(Provider, {i18n: i18next}, props.children)
}
