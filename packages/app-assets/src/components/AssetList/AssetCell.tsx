import React from 'react'
import styled, {css} from 'styled-components'
import {down} from 'styled-breakpoints'
import {DataType} from './index'

const Wrapper = styled.div<{isKPHA?: boolean}>`
  display: flex;
  align-items: center;

  ${(props) =>
    !props.isKPHA &&
    css`
      height: 36px;
    `}
`

const Name = styled.span<{isKPHA?: boolean}>`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #111111;
  margin-left: 20px;
  min-width: 53px;

  ${down('sm')} {
    margin-left: 0;
  }
`

const ImgWrapper = styled.img<{isKPHA?: boolean}>`
  height: ${(props) => (props.isKPHA ? '48px' : '24px')};
  width: auto;
  ${down('sm')} {
    display: none;
  }
`

const AssetCell: React.FC<Pick<DataType, 'name' | 'icon' | 'isKPHA'>> = ({
  name,
  icon,
  isKPHA,
}) => {
  return (
    <Wrapper isKPHA={isKPHA}>
      <ImgWrapper isKPHA={isKPHA} src={icon} alt={name} />
      <Name isKPHA={isKPHA}>{name}</Name>
    </Wrapper>
  )
}

export default AssetCell
