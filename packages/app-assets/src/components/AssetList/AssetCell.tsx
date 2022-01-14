import React, {useMemo} from 'react'
import styled from 'styled-components'
import {down} from 'styled-breakpoints'
import {DataType} from './index'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const Name = styled.span<{isKPHA?: boolean}>`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: ${(props) => (props.isKPHA ? '20px' : '16px')};
  line-height: ${(props) => (props.isKPHA ? '20px' : '16px')};
  color: #111111;
  margin-left: 20px;
  min-width: 53px;

  ${down('sm')} {
    font-size: 16px;
    line-height: 16px;
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

const AssetCell: React.FC<Pick<DataType, 'name' | 'icon'>> = ({name, icon}) => {
  const isKPHA = useMemo(() => {
    return name === 'K-PHA'
  }, [name])
  return (
    <Wrapper>
      <ImgWrapper isKPHA={isKPHA} src={icon} alt={name} />
      <Name isKPHA={isKPHA}>{name}</Name>
    </Wrapper>
  )
}

export default AssetCell
