import {Wallet} from '@phala/wallets/types'
import {ModalBody, ModalHeader} from 'baseui/modal'
import {useEffect, useState, VFC} from 'react'
import {Block} from 'baseui/block'
import {ArrowRight, Download} from 'react-feather'
import {useStyletron} from 'baseui'
import {useAccounts} from '@phala/app-store'

const WalletModalBody: VFC = () => {
  const [css, theme] = useStyletron()
  const [wallets, setWallets] = useState<Wallet[]>()
  const [, setAccounts] = useAccounts()
  useEffect(() => {
    import('@phala/wallets').then(({getWallets}) => {
      setWallets(getWallets())
    })
  }, [])

  const enableWallet = async (wallet: Wallet) => {
    await wallet.enable()
    const walletAccounts = await wallet.getAccounts()
    if (walletAccounts) {
      setAccounts(walletAccounts)
    }
  }

  return (
    <>
      <ModalHeader>Connect Wallet</ModalHeader>
      <ModalBody>
        <Block color="primaryA">
          {wallets &&
            wallets.map((wallet) => {
              // NOTE: logo.src is imported svg, it is react component instead of string because of svg-react-loader
              const Logo = wallet.logo.src as unknown as VFC<{
                className: string
              }>
              return (
                <Block
                  height="48px"
                  marginTop="scale400"
                  display="flex"
                  alignItems="center"
                  $style={{
                    ...theme.borders.border200,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    if (wallet.installed) {
                      enableWallet(wallet)
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
                    })}
                  >
                    {wallet.title}
                  </span>

                  {wallet.installed ? (
                    <ArrowRight size={18} />
                  ) : (
                    <Block display="flex" alignItems="center" flex="none">
                      <span>Install</span>
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

export default WalletModalBody
