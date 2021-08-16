import React from 'react'
import { Target } from '.'
import Block from './Block'

type Props = {
  value: Target
  disableSelect: boolean
}

const To: React.FC<Props> = (props) => {
  return <Block {...props} title="To"></Block>
}

export default To
