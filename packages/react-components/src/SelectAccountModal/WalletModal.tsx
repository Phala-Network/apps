import {Wallet} from '@phala/wallets/types'
import {Modal, ModalBody, ModalHeader, ModalProps} from 'baseui/modal'
import {useEffect, useState, VFC} from 'react'
import {Block} from 'baseui/block'
import {ArrowRight, Download} from 'react-feather'
import {useStyletron} from 'baseui'

type Props = {
  onSelect?: (wallet: Wallet) => void
}

const walletsOrder = ['talisman', 'polkadot-js', 'subwallet-js']

const Body: VFC<Props> = ({onSelect}) => {
  const [css, theme] = useStyletron()
  const [wallets, setWallets] = useState<Wallet[]>()
  useEffect(() => {
    let unmounted = false
    import('@phala/wallets').then(({getWallets}) => {
      const sortedWallets = getWallets().sort((a, b) => {
        return (
          walletsOrder.indexOf(a.extensionName) -
          walletsOrder.indexOf(b.extensionName)
        )
      })
      if (!unmounted) {
        setWallets(sortedWallets)
      }
    })
    return () => {
      unmounted = true
    }
  }, [])

  return (
    <>
      <ModalHeader>Select Wallet</ModalHeader>
      <ModalBody>
        <Block>
          {wallets &&
            wallets.map((wallet) => {
              // NOTE: logo.src is imported svg, it is react component instead of string because of svg-react-loader
              const Logo = wallet.logo.src as unknown as VFC<{
                className: string
              }>
              return (
                <Block
                  padding="scale600"
                  marginTop="scale600"
                  backgroundColor="backgroundSecondary"
                  display="flex"
                  alignItems="center"
                  $style={{
                    cursor: 'pointer',
                    ':hover': {
                      backgroundColor: theme.colors.backgroundTertiary,
                    },
                  }}
                  onClick={() => {
                    if (wallet.installed) {
                      onSelect?.(wallet)
                    } else {
                      window.open(wallet.installUrl)
                    }
                  }}
                  key={wallet.extensionName}
                >
                  <Logo
                    className={css({
                      width: '36px',
                      height: '36px',
                      flex: 'none',
                    })}
                  />

                  <span
                    className={css({
                      flex: 1,
                      marginLeft: theme.sizing.scale600,
                      fontWeight: 600,
                    })}
                  >
                    {wallet.title}
                  </span>

                  {wallet.installed ? (
                    <ArrowRight size={18} />
                  ) : (
                    <Block display="flex" alignItems="center" flex="none">
                      <span
                        className={css({marginRight: theme.sizing.scale400})}
                      >
                        Install
                      </span>
                      <Download size={18} />
                    </Block>
                  )}
                </Block>
              )
            })}
        </Block>
      </ModalBody>
    </>
  )
}

const WalletModal: VFC<ModalProps & Props> = ({isOpen, onClose, onSelect}) => {
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
      <Body onSelect={onSelect} />
    </Modal>
  )
}

export default WalletModal
