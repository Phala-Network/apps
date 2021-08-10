import React from 'react'
import styled from 'styled-components'
import scrollbar from '../../style/scrollbar'
import { Account } from '../../types/normal'
import Button from '../Button'
import Center from '../Center'
import Modal from '../Modal'
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
  grid-gap: 24px;
  margin: 24px 0;
  max-height: 200px;
  overflow-y: auto;

  ${scrollbar}
`

const SelectAccountModal: React.FC<SelectAccountModalProps> = (props) => {
  const { visible, currentAccount, accounts, onClose, onSelect } = props

  return (
    <Modal
      onClose={onClose}
      visible={visible}
      title={<Center>Select An Account</Center>}>
      <Content style={{ paddingRight: accounts.length > 2 ? 20 : 0 }}>
        {accounts.map((item) => (
          <AccountOption
            key={item.address}
            active={currentAccount?.address === item.address}
            onClick={(account) => {
              onSelect(account)
              onClose()
            }}
            {...item}></AccountOption>
        ))}
      </Content>
      <Button style={{ width: '100%' }} onClick={onClose}>
        Cancel
      </Button>
    </Modal>
  )
}

export default SelectAccountModal
