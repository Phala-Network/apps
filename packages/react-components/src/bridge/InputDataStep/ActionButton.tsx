import {useEthereumAccountAtom, usePolkadotAccountAtom} from '@phala/app-store'
import React, {useState} from 'react'
import {Button, EthereumAccountModal, PolkadotAccountModal} from '../..'

type Props = {
  onClick(): void
  isFromEthereum: boolean
}

const ActionButton: React.FC<Props> = (props) => {
  const {onClick, isFromEthereum} = props

  const [polkadotAccount] = usePolkadotAccountAtom()
  const [ethereumAccount] = useEthereumAccountAtom()
  const [ethereumAccountModalViable, setEthereumAccountModalViable] =
    useState(false)
  const [polkadotAccountModalViable, setPolkadotAccountModalViable] =
    useState(false)

  let render = (
    <Button disabled type="primary" onClick={onClick}>
      Next
    </Button>
  )

  if (!isFromEthereum && !polkadotAccount) {
    render = (
      <>
        <Button
          disabled
          onClick={() => setPolkadotAccountModalViable(true)}
          type="primary"
        >{`Connect Polkadot{.js}`}</Button>

        <PolkadotAccountModal
          onClose={() => setPolkadotAccountModalViable(false)}
          visible={polkadotAccountModalViable}
        />
      </>
    )
  }

  if (isFromEthereum && !ethereumAccount) {
    render = (
      <>
        <Button
          disabled
          onClick={() => setEthereumAccountModalViable(true)}
          type="primary"
        >
          Connet METAMASK
        </Button>

        <EthereumAccountModal
          onClose={() => setEthereumAccountModalViable(false)}
          visible={ethereumAccountModalViable}
        />
      </>
    )
  }

  return render
}

export default ActionButton
