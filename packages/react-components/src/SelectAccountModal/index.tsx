import {Account} from '@phala/app-types'
import React from 'react'
import styled from 'styled-components'
import {ModalWrapper, ModalButtonWrapper} from '../Modal'
import scrollbar from '../scrollbar'
import AccountOption from './AccountOption'
import {ModalBody} from 'baseui/modal'

export type SelectAccountModalProps = {
  visible: boolean
  onClose: () => void
  accounts: Account[]
  currentAccount?: Account
  onSelect: (account: Account) => void
}

const Content = styled.div`
  display: grid;
  grid-gap: 20px;
  max-height: 200px;
  overflow-y: auto;

  ${scrollbar}
`

const ModalTitle = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 32px;
  margin-bottom: 30px;
`

export const SelectAccountModal: React.FC<SelectAccountModalProps> = (
  props
) => {
  const {visible, currentAccount, accounts, onClose, onSelect} = props

  return (
    <ModalWrapper onClose={onClose} visible={visible}>
      <ModalTitle>Select An Account</ModalTitle>
      <ModalBody style={{padding: '10px 0', margin: 0}}>
        <Content style={{paddingRight: accounts.length > 2 ? 20 : 0}}>
          {accounts.map((item) => (
            <AccountOption
              key={item.address}
              active={currentAccount?.address === item.address}
              onClick={(account) => {
                onSelect(account)
                onClose()
              }}
              {...item}
            ></AccountOption>
          ))}
        </Content>
      </ModalBody>
      <ModalButtonWrapper onClick={props.onClose}>Cancel</ModalButtonWrapper>
    </ModalWrapper>
  )
}
