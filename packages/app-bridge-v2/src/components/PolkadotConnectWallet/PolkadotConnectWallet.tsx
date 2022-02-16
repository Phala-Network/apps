import {usePolkadotAccountAtom} from '@phala/app-store'
import {PolkadotAccountModal} from '@phala/react-components'
import {useState} from 'react'
import {littleRoundButtonOverrides} from '../../style/littleRoundButtonOverrides'
import {Button} from '../Button'

export const PolkadotConnectWallet = () => {
  const [polkadotAccount] = usePolkadotAccountAtom()
  const [polkadotAccountModalViable, setPolkadotAccountModalViable] =
    useState(false)

  return (
    <>
      <Button
        overrides={littleRoundButtonOverrides}
        onClick={() => setPolkadotAccountModalViable(true)}
      >
        {polkadotAccount?.name ? `Change` : `Connect Wallet`}
      </Button>

      <PolkadotAccountModal
        onClose={() => setPolkadotAccountModalViable(false)}
        visible={polkadotAccountModalViable}
      />
    </>
  )
}
