import React from 'react'
import styled from 'styled-components'

const Icon = styled.div`
  width: 44px;
  height: 44px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -10px;
  margin-bottom: -10px;
  margin-left: 16px;
  border-radius: 22px;
  position: relative;
  cursor: pointer;

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

const ExchangeIcon: React.FC<React.ComponentProps<typeof Icon>> = (props) => {
  return (
    <Icon {...props}>
      <svg
        width="16"
        height="18"
        viewBox="0 0 16 18"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M6.04832 17.4896H4.34832C4.1274 17.4896 3.94832 17.3105 3.94832 17.0896V6.88962C3.94832 6.66871 3.76923 6.48962 3.54832 6.48962H1.10058C0.844276 6.48962 0.706004 6.18899 0.872806 5.99439L5.92054 0.105363C6.1018 -0.106106 6.44832 0.0220791 6.44832 0.300601V17.0896C6.44832 17.3105 6.26923 17.4896 6.04832 17.4896Z" />
        <path d="M9.84832 0.489623H11.5483C11.7692 0.489623 11.9483 0.668708 11.9483 0.889623V11.0896C11.9483 11.3105 12.1274 11.4896 12.3483 11.4896H14.7961C15.0524 11.4896 15.1906 11.7903 15.0238 11.9849L9.97609 17.8739C9.79483 18.0854 9.44832 17.9572 9.44832 17.6786V0.889623C9.44832 0.66871 9.6274 0.489623 9.84832 0.489623Z" />
      </svg>
    </Icon>
  )
}

export default ExchangeIcon
