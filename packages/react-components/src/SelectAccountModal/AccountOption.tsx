import {Account} from '@phala/app-types'
import React from 'react'
import styled from 'styled-components'
import {Copy} from '../Copy'

type Props = {
  name?: string
  address: string
  active?: boolean
  onClick: (account: Account) => void
}

const Name = styled.div`
  font-weight: 400;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  font-family: Montserrat;
`

const Address = styled.div`
  word-break: break-all;
  font-weight: 300;
  font-size: 14px;
  line-height: 14px;
`

const AccountInfo = styled.div`
  margin-right: 20px;
`

const AccountOptionWithStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px 16px 20px;

  background-color: #eeeeee;
  box-sizing: border-box;

  color: #111111;
  font-style: normal;
  font-size: 16px;
  line-height: 16px;

  cursor: pointer;

  &:hover,
  &.active {
    background-color: #d1ff52;
  }
`

const icon = (
  <svg
    width="19"
    height="12"
    viewBox="0 0 19 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.664898 4.01165C1.2181 3.49081 2.11501 3.49081 2.66821 4.01165L7.67647 8.72694L16.398 0.515628C16.9512 -0.00520918 17.8481 -0.00520918 18.4013 0.515628C18.9545 1.03646 18.9545 1.88091 18.4013 2.40174L8.67813 11.5561C8.12493 12.077 7.22802 12.077 6.67482 11.5561L0.664898 5.89776C0.1117 5.37693 0.1117 4.53248 0.664898 4.01165Z"
      fill="#111111"
    />
  </svg>
)

const AccountOption: React.FC<Props> = (props) => {
  const {name = '', address, active = false, onClick} = props

  return (
    <AccountOptionWithStyle
      className={active ? 'active' : ''}
      onClick={() => onClick({name, address})}
    >
      <AccountInfo>
        {name && (
          <Name>
            {name}
            <Copy style={{marginLeft: 22}} value={address}></Copy>
          </Name>
        )}
        {address && <Address>{address}</Address>}
      </AccountInfo>
      {active ? icon : null}
    </AccountOptionWithStyle>
  )
}

export default AccountOption
