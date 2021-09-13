import styled from 'styled-components'

export const CopyIcon = styled.svg`
  fill: black;
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }

  &:hover {
    fill: ${(props) => props.theme.colors.phala};
  }
`
