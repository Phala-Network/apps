import {useCurrentAccount} from '@phala/store'
import {SelectAccountModal} from '@phala/react-components'
import {useState} from 'react'
import {littleRoundButtonOverrides} from '../../style/littleRoundButtonOverrides'
import {Button} from '../Button'

export const PolkadotConnectWallet = () => {
  const [polkadotAccount] = useCurrentAccount()
  const [SelectAccountModalViable, setSelectAccountModalViable] =
    useState(false)

  return (
    <>
      <Button
        overrides={littleRoundButtonOverrides}
        onClick={() => setSelectAccountModalViable(true)}
      >
        {polkadotAccount?.name ? `Change` : `Connect Wallet`}
      </Button>

      <SelectAccountModal
        onClose={() => setSelectAccountModalViable(false)}
        isOpen={SelectAccountModalViable}
      />
    </>
  )
}
