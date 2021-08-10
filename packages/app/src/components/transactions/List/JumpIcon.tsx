import React from 'react'
import styled from 'styled-components'

const JumpIconRoot = styled.div`
  margin-left: 25px;
`

const JumpIcon: React.FC = () => {
  return (
    <JumpIconRoot>
      <svg
        width="5"
        height="8"
        viewBox="0 0 5 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L3.8 4L1 7" stroke="black" />
      </svg>
    </JumpIconRoot>
  )
}

export default JumpIcon
