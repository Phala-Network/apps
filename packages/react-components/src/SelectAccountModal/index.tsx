import {Account} from '@phala/app-types'
import {useTranslation} from '@phala/react-i18n'
import React from 'react'
import styled from 'styled-components'
import {Button} from '../Button'
import {Center} from '../Center'
import {Modal} from '../Modal'
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
  grid-gap: 24px;
  margin: 24px 0;
  max-height: 200px;
  overflow-y: auto;

  ${scrollbar}
`

export const SelectAccountModal: React.FC<SelectAccountModalProps> = (
  props
) => {
  const {t} = useTranslation()
  const {visible, currentAccount, accounts, onClose, onSelect} = props

  return (
    <Modal
      onClose={onClose}
      visible={visible}
      title={<Center>{t('select_account')}</Center>}
    >
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
      <Button style={{width: '100%'}} onClick={onClose}>
        {t('select_account_cancel')}
      </Button>
    </Modal>
  )
}
