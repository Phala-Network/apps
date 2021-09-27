import {useTranslation} from '@phala/react-i18n'
import React from 'react'
import {Target} from '.'
import Block from './Block'

type Props = {
  value: Target
  disableSelect: boolean
}

const From: React.FC<Props> = (props) => {
  const {t} = useTranslation()

  return <Block {...props} title={t('bridge_from')} />
}

export default From
