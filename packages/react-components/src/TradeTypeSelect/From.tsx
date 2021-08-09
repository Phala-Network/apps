import React from 'react'
import { Target } from '.'
import Block from './Block'

type Props = {
  value: Target
  disableSelect: boolean
}

const From: React.FC<Props> = (props) => {
  return <Block {...props} title="From" />
}

export default From
