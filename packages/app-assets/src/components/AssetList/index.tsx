import React from 'react'
import styled from 'styled-components'
import {down} from 'styled-breakpoints'
import Table from './Table'

const Wrapper = styled.div`
  padding: 30px 85px;

  ${down('sm')} {
    padding: 22px 10px;
  }
`

const Title = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 36px;
  color: #111111;
  margin-bottom: 20px;

  ${down('sm')} {
    font-size: 20px;
    line-height: 20px;
  }
`

const AssetList: React.FC = () => {
  return (
    <Wrapper>
      <Title>ASSETS</Title>
      <Table />
    </Wrapper>
  )
}

export default AssetList
