import React from 'react'
import styled from 'styled-components'
import { Account } from '../../types/normal'

type Props = {
  name?: string
  address: string
  active?: boolean
  onClick: (account: Account) => void
}

const Name = styled.div``

const Address = styled.div`
  word-break: break-all;
`

const AccountOptionWithStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 16px;

  height: 56px;

  border: 0.5px solid #878787;
  box-sizing: border-box;

  color: #878787;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;

  cursor: pointer;

  &:hover,
  &.active {
    background-color: ${(props) => props.theme.colors.phala};

    ${Name} {
      color: rgba(0, 0, 0, 0.5);
    }

    ${Address} {
      color: rgba(0, 0, 0, 0.9);
    }
  }
`

const icon = (
  <svg
    width="10"
    height="7"
    viewBox="0 0 10 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.22347 2.34212C0.52143 2.04416 1.00452 2.04416 1.30248 2.34212L4 5.03964L8.69752 0.342122C8.99548 0.0441623 9.47857 0.0441623 9.77653 0.342122C10.0745 0.640082 10.0745 1.12317 9.77653 1.42113L4.5395 6.65816C4.24154 6.95612 3.75846 6.95612 3.4605 6.65816L0.22347 3.42113C-0.07449 3.12317 -0.07449 2.64008 0.22347 2.34212Z"
      fill="black"
    />
  </svg>
)

const AccountOption: React.FC<Props> = (props) => {
  const { name = '', address, active = false, onClick } = props

  return (
    <AccountOptionWithStyle
      className={active ? 'active' : ''}
      onClick={() => onClick({ name, address })}>
      <div>
        {name && <Name>{name}</Name>}
        {address && <Address>{address}</Address>}
      </div>
      {active ? icon : null}
    </AccountOptionWithStyle>
  )
}

export default AccountOption
