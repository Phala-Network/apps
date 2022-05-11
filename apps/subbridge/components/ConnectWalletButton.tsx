import {fromChainAtom} from '@/store/bridge'
import {ethereumProviderAtom, evmAccountAtom} from '@/store/ethers'
import {polkadotWalletModalOpenAtom} from '@/store/polkadotWalletModal'
import {LoadingButton} from '@mui/lab'
import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import {useAtom} from 'jotai'
import {FC, useState} from 'react'

const ConnectEvmWalletButton: FC<ButtonProps> = (props) => {
  const [open, setOpen] = useState(false)
  const [ethereum] = useAtom(ethereumProviderAtom)
  const [, setEvmAccount] = useAtom(evmAccountAtom)
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    if (!ethereum) {
      setOpen(true)
      return
    }
    setLoading(true)
    ethereum
      .request({method: 'eth_requestAccounts'})
      .then((accounts) => {
        const account = (accounts as string[])[0]
        setEvmAccount(account || null)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <LoadingButton
        loading={loading}
        {...props}
        onClick={(e) => {
          handleClick()
          props.onClick?.(e)
        }}
      >
        {props.children || 'Connect Wallet'}
      </LoadingButton>
      <Dialog
        open={open}
        onClick={() => {
          setOpen(false)
        }}
      >
        <DialogTitle>Metamask Is Not Installed</DialogTitle>
        <DialogContent>
          Please install the Metamask extension and refresh the page.
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            onClick={() => window.open('https://metamask.io/')}
          >
            Install Metamask
          </Button>
          <Button variant="text" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const ConnectPolkadotButton: FC<ButtonProps> = (props) => {
  const [, setPolkadotWalletModalOpen] = useAtom(polkadotWalletModalOpenAtom)

  const handleClick = () => {
    setPolkadotWalletModalOpen(true)
  }

  return (
    <Button
      {...props}
      onClick={(e) => {
        handleClick()
        props.onClick?.(e)
      }}
    >
      {props.children || 'Connect Wallet'}
    </Button>
  )
}

const ConnectWalletButton: FC<ButtonProps> = (props) => {
  const [fromChain] = useAtom(fromChainAtom)

  if (fromChain.kind === 'evm') {
    return <ConnectEvmWalletButton {...props} />
  }

  if (fromChain.kind === 'polkadot') {
    return <ConnectPolkadotButton {...props} />
  }

  return null
}

export default ConnectWalletButton
