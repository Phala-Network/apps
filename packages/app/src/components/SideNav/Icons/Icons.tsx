import React from 'react'
import styled from 'styled-components'
import Discord from './Discord'
import Feedback from './Feedback'
import People from './People'

const IconsWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  transform-origin: left center;
  align-items: center;

  svg {
    fill: gray;

    &:hover {
      fill: white;
      cursor: pointer;
    }
  }
`

const Icons: React.FC<React.ComponentProps<typeof IconsWrap>> = (props) => {
  return (
    <IconsWrap {...props}>
      <People></People>
      <Feedback></Feedback>
      <Discord></Discord>
    </IconsWrap>
  )
}

export default Icons
