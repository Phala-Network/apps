import React from 'react'
import styled from 'styled-components'
import { up, down } from 'styled-breakpoints'

const Point = styled.div`
  width: 12px;
  height: 12px;
  background: #202020;
  border: 10px solid #ececec;
  ${down('sm')} {
    display: none;
  }
`

const CategoryWrap = styled.div`
  position: relative;
  padding: 16px 48px 40px 160px;
  ${down('sm')} {
    padding: 16px 24px;
  }
`

const CategoryHeader = styled.div`
  display: flex;
  position: absolute;
  left: -16px;
  top: 0;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
  color: #202020;
  ${down('sm')} {
    font-size: 14px;
    position: unset;
  }
`

const Title = styled.div`
  ${up('md')} {
    margin-top: 10px;
  }
`

const Description = styled.div`
  margin-top: 8px;
  ${down('sm')} {
    font-size: 12px;
  }
`

const CategoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${up('md')} {
    margin-top: -50px;
  }
`

type Props = {
  title?: string
  description?: string
}

const Category: React.FC<Props> = (props) => {
  const { children, title, description } = props

  return (
    <CategoryWrap>
      <CategoryHeader>
        <Point></Point>
        <div>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </div>
      </CategoryHeader>
      <CategoryContent>{children}</CategoryContent>
    </CategoryWrap>
  )
}

export default Category
