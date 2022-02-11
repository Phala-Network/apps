import {PolkadotAccountModal} from '@phala/react-components'
import {useState} from 'react'
import {littleRoundButtonOverrides} from '../../style/littleRoundButtonOverrides'
import {Button} from '../Button'

export const PolkadotConnectWallet = () => {
  const [polkadotAccountModalViable, setPolkadotAccountModalViable] =
    useState(false)

  return (
    <>
      <Button
        overrides={littleRoundButtonOverrides}
        onClick={() => setPolkadotAccountModalViable(true)}
      >{`Connect Wallet`}</Button>

      <PolkadotAccountModal
        onClose={() => setPolkadotAccountModalViable(false)}
        visible={polkadotAccountModalViable}
      />
    </>
  )
}
