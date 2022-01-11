import React from 'react'
import styled from 'styled-components'
import {DataType} from './Table'

const Wrapper = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #111111;
`

const ValueCell: React.FC<Pick<DataType, 'value'>> = ({value}) => {
  return <Wrapper>{value}</Wrapper>
}

export default ValueCell
