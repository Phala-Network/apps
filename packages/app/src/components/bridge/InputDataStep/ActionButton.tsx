import { useAtom } from 'jotai'
import React, { useState } from 'react'
import ethereumAccountAtom from '../../../atoms/ethereumAccountAtom'
import polkadotAccountAtom from '../../../atoms/polkadotAccountAtom'
import { voidFn } from '../../../types/normal'
import Button from '../../Button'
import EthereumAccountModal from '../../EthereumAccountModal'
import PolkadotAccountModal from '../../PolkadotAccountModal'

type Props = {
  onClick: voidFn
  isFromEthereum: boolean
}

const ActionButton: React.FC<Props> = (props) => {
  const { onClick, isFromEthereum } = props

  const [polkadotAccount] = useAtom(polkadotAccountAtom)
  const [ethereumAccount] = useAtom(ethereumAccountAtom)
  const [ethereumAccountModalViable, setEthereumAccountModalViable] = useState(
    false
  )
  const [polkadotAccountModalViable, setPolkadotAccountModalViable] = useState(
    false
  )

  let render = (
    <Button type="primary" onClick={onClick}>
      Next
    </Button>
  )

  if (!isFromEthereum && !polkadotAccount) {
    render = (
      <>
        <Button
          onClick={() => setPolkadotAccountModalViable(true)}
          type="primary">{`Connect Polkadot{.js}`}</Button>

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
          onClick={() => setEthereumAccountModalViable(true)}
          type="primary">
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
