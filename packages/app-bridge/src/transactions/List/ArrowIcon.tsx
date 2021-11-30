import React from 'react'
import styled from 'styled-components'

const ArrowIconRoot = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ArrowIcon: React.FC = () => {
  return (
    <ArrowIconRoot>
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M4.2 1L7 4M7 4L4.2 7M7 4H0" stroke="black" />
      </svg>
    </ArrowIconRoot>
  )
}

export default ArrowIcon
