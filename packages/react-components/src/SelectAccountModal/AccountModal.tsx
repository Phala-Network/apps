import {polkadotAccountsAtom, useCurrentAccount} from '@phala/store'
import {trimAddress} from '@phala/utils'
import Identicon from '@polkadot/react-identicon'
import {useStyletron} from 'baseui'
import {Block} from 'baseui/block'
import {Button} from 'baseui/button'
import {Modal, ModalBody, ModalHeader, ModalProps} from 'baseui/modal'
import {toaster} from 'baseui/toast'
import {useAtom} from 'jotai'
import {FC} from 'react'

type Props = {
  onSelect?: (address: string) => void
  onDisconnect?: () => void
}

const Body: FC<Props> = ({onSelect, onDisconnect}) => {
  const [accounts] = useAtom(polkadotAccountsAtom)
  const [currentAccount] = useCurrentAccount()
  const [css, theme] = useStyletron()

  return (
    <>
      <ModalHeader>Select An Account</ModalHeader>
      <ModalBody>
        {accounts && accounts.length > 0 ? (
          <Block maxHeight="230px" overflow="auto">
            {accounts.map((account) => {
              const isCurrentAccount =
                account.address === currentAccount?.address
              return (
                <Block
                  marginTop="scale600"
                  padding="scale600"
                  display="flex"
                  alignItems="center"
                  backgroundColor={
                    isCurrentAccount
                      ? theme.colors.accent
                      : theme.colors.backgroundSecondary
                  }
                  key={account.address}
                  $style={{
                    cursor: 'pointer',
                    ':hover': {
                      backgroundColor: isCurrentAccount
                        ? theme.colors.accent
                        : theme.colors.backgroundTertiary,
                    },
                  }}
                  onClick={(e) => {
                    if ((e.target as HTMLElement)?.tagName === 'DIV') {
                      onSelect?.(account.address)
                    }
                  }}
                >
                  <Identicon
                    className={css({flex: 'none'})}
                    value={account.address}
                    size={36}
                    theme="polkadot"
                    onCopy={() => {
                      toaster.info('Address copied to clipboard', {})
                    }}
                  />
                  <Block marginLeft="scale400" flex="1">
                    <Block $style={{fontWeight: 600}}>{account.name}</Block>
                    <Block $style={{fontSize: '12px'}}>
                      {trimAddress(account.address)}
                    </Block>
                  </Block>

                  {isCurrentAccount && (
                    <Button
                      size="compact"
                      kind="tertiary"
                      onClick={onDisconnect}
                    >
                      Disconnect
                    </Button>
                  )}
                </Block>
              )
            })}
          </Block>
        ) : (
          <span>
            No account found, please add account in your wallet extension or
            unlock it.
          </span>
        )}
      </ModalBody>
    </>
  )
}

const AccountModal: VFC<ModalProps & Props> = ({
  isOpen,
  onClose,
  onSelect,
  onDisconnect,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      overrides={{
        Dialog: {
          style: ({$theme}) => ({
            borderRadius: 0,
            borderWidth: '2px',
            borderColor: $theme.colors.accent,
            borderStyle: 'solid',
          }),
        },
      }}
    >
      <Body onSelect={onSelect} onDisconnect={onDisconnect} />
    </Modal>
  )
}

export default AccountModal
