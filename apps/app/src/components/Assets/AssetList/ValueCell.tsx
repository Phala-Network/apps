import React from 'react'
import styled from 'styled-components'
import {formatCurrency} from '@phala/utils'
import {DataType} from './index'

const Wrapper = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: #111111;
`

const ValueCell: React.FC<Pick<DataType, 'value'>> = ({value}) => {
  return <Wrapper>{value ? `$ ${formatCurrency(value)}` : '-'}</Wrapper>
}

export default ValueCell
