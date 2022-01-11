import React from 'react'
import styled from 'styled-components'
import Button from '../Button'
import {DataType} from './Table'

type Props = {
  row?: DataType
}

const Wrapper = styled.div``

const ButtonCell: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Button>Transfer</Button>
    </Wrapper>
  )
}

export default ButtonCell
