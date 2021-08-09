import React from 'react'
import styled from 'styled-components'
import useClipboard from '../hooks/useClipboard'

type Props = {
  value: string
}

const CopyIcon = styled.svg`
  fill: white;
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }

  &:hover {
    fill: ${(props) => props.theme.colors.phala};
  }
`

const Copy: React.FC<Props> = (props) => {
  const { value } = props

  const { copy } = useClipboard()

  return (
    <CopyIcon
      onClick={() => {
        copy(value)
      }}
      width="13"
      height="14"
      viewBox="0 0 13 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 1H5V2H4V0H13V10H11V9H12V1Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 14V4H9V14H0ZM1 5H8V13H1V5Z"
      />
    </CopyIcon>
  )
}

export default Copy
