import React from 'react'
import styled from 'styled-components'
import {DataType} from './index'
import Button from '../Button'
import MoreButton from '../MoreButton'

const Wrapper = styled.div`
  display: flex;
`

const Spacer = styled.div`
  margin-right: 20px;
`

const ButtonCell: React.FC<Pick<DataType, 'name'>> = () => {
  const handleTransfer = () => {
    //
  }
  return (
    <Wrapper>
      <Button onClick={handleTransfer}>Transfer</Button>
      <Spacer />
      <MoreButton />
    </Wrapper>
  )
}

export default ButtonCell
