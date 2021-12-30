import {Account} from '@phala/app-types'
import React from 'react'
import styled from 'styled-components'
import {ModalWrapper} from '../Modal'
import scrollbar from '../scrollbar'
import AccountOption from './AccountOption'
import {ModalFooter, ModalButton} from 'baseui/modal'

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
  margin-bottom: 40px;
`

export const SelectAccountModal: React.FC<SelectAccountModalProps> = (
  props
) => {
  const {visible, currentAccount, accounts, onClose, onSelect} = props

  return (
    <ModalWrapper onClose={onClose} visible={visible}>
      <ModalTitle>Select An Account</ModalTitle>
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
      <ModalFooter style={{padding: 0, margin: '40px 0 0'}}>
        <ModalButton
          onClick={() => props.onClose()}
          overrides={{
            BaseButton: {
              style: () => ({
                width: '100%',
                backgroundColor: '#EEEEEE',
                fontFamily: 'Montserrat',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: '20px',
                paddingTop: '16px',
                paddingBottom: '16px',
                color: '#111111',
                ':hover': {
                  backgroundColor: '#D1FF52',
                },
              }),
            },
          }}
        >
          Cancel
        </ModalButton>
      </ModalFooter>
    </ModalWrapper>
  )
}
