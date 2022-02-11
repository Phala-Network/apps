import React from 'react'
import styled from 'styled-components'

const Icon = styled.div`
  width: 66px;
  height: 66px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  z-index: 1;
  border: 6px solid #e6e6e6;
  margin-top: -28px;
  margin-bottom: -28px;

  svg {
    transition: transform 0.2s;
    fill: #202020;
  }

  &:hover {
    svg {
      transform: scale(1.2);
    }
  }

  &:active {
    svg {
      transform: scale(0.9);
    }
  }
`

export const ExchangeIcon: React.FC<React.ComponentProps<typeof Icon>> = (
  props
) => {
  return (
    <Icon {...props}>
      <svg
        width="22"
        height="28"
        viewBox="0 0 22 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.07266 26.7344H5.52267C5.19129 26.7344 4.92266 26.4658 4.92266 26.1344V10.8344C4.92266 10.5031 4.65404 10.2344 4.32266 10.2344H0.651064C0.266605 10.2344 0.0591968 9.78348 0.309399 9.49158L7.881 0.658045C8.15289 0.34084 8.67266 0.533119 8.67266 0.950902V26.1344C8.67266 26.4658 8.40404 26.7344 8.07266 26.7344Z"
          fill="#111111"
        />
        <path
          d="M13.7727 1.23443H16.3227C16.654 1.23443 16.9227 1.50306 16.9227 1.83443V17.1344C16.9227 17.4658 17.1913 17.7344 17.5227 17.7344H21.1943C21.5787 17.7344 21.7861 18.1854 21.5359 18.4773L13.9643 27.3108C13.6924 27.628 13.1727 27.4358 13.1727 27.018V1.83443C13.1727 1.50306 13.4413 1.23443 13.7727 1.23443Z"
          fill="#111111"
        />
      </svg>
    </Icon>
  )
}
