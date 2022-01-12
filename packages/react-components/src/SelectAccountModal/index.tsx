import {Account} from '@phala/app-types'
import React from 'react'
import styled from 'styled-components'
import {
  ModalWrapper,
  ModalButtonWrapper,
  ModalFooterWrapper,
  ModalTitleWrapper,
} from '../Modal'
import scrollbar from '../scrollbar'
import AccountOption from './AccountOption'

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
  max-height: 300px;
  overflow-y: auto;

  ${scrollbar}
`

export const SelectAccountModal: React.FC<SelectAccountModalProps> = (
  props
) => {
  const {visible, currentAccount, accounts, onClose, onSelect} = props

  return (
    <ModalWrapper onClose={onClose} visible={visible}>
      <ModalTitleWrapper>Select An Account</ModalTitleWrapper>
      <Content>
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
      <ModalFooterWrapper>
        <ModalButtonWrapper onClick={props.onClose}>Cancel</ModalButtonWrapper>
      </ModalFooterWrapper>
    </ModalWrapper>
  )
}
