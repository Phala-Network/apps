import React from 'react'
import styled, {css} from 'styled-components'
import {formatCurrency} from '@phala/utils'
import {DataType} from './index'

const Wrapper = styled.div<{isKPHA?: boolean}>`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #111111;
  padding: 24px 0 20px;

  ${(props) =>
    !props.isKPHA &&
    css`
      height: 36px;
      padding: 10px 0;
      display: flex;
      align-items: center;
    `}
`

const ValueCell: React.FC<Pick<DataType, 'value' | 'isKPHA'>> = ({
  value,
  isKPHA,
}) => {
  return (
    <Wrapper isKPHA={isKPHA}>
      {value ? `$ ${formatCurrency(value)}` : '-'}
    </Wrapper>
  )
}

export default ValueCell
