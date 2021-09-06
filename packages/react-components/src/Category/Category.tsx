import React from 'react'
import {
  CategoryContent,
  CategoryHeader,
  CategoryWrap,
  Description,
  Point,
  Title,
} from './styledComponents'

type Props = {
  title?: string
  description?: string
}

export const Category: React.FC<Props> = (props) => {
  const {children, title, description} = props

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
