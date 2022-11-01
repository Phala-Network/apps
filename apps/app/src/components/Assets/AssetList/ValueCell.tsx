import {formatCurrency} from '@phala/utils'
import React from 'react'
import styled from 'styled-components'
import {DataType} from './index'

const Wrapper = styled.div`
  white-space: nowrap;
  font-weight: 600;
  font-size: 16px;
  color: #111111;
`

const ValueCell: React.FC<Pick<DataType, 'value'>> = ({value}) => {
  return <Wrapper>{value ? `$ ${formatCurrency(value)}` : '-'}</Wrapper>
}

export default ValueCell
