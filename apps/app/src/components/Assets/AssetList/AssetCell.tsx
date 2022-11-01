import React, {useMemo} from 'react'
import {down} from 'styled-breakpoints'
import styled from 'styled-components'
import {DataType} from './index'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const Name = styled.span<{isPHA?: boolean}>`
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: #111111;
  margin-left: 20px;
  min-width: 53px;

  ${down('md')} {
    font-size: 16px;
    line-height: 16px;
    margin-left: 0;
  }
`

const ImgWrapper = styled.img<{isPHA?: boolean}>`
  height: ${(props) => (props.isPHA ? '48px' : '24px')};
  width: auto;
  ${down('md')} {
    display: none;
  }
`

const AssetCell: React.FC<Pick<DataType, 'name' | 'icon'>> = ({name, icon}) => {
  const isPHA = useMemo(() => {
    return name === 'K-PHA' || name === 'PHA'
  }, [name])
  return (
    <Wrapper>
      <ImgWrapper isPHA={isPHA} src={icon} alt={name} />
      <Name isPHA={isPHA}>{name}</Name>
    </Wrapper>
  )
}

export default AssetCell
