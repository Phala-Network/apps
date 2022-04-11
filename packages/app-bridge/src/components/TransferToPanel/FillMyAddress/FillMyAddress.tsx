import {useEthereumAccountAtom, useCurrentAccount} from '@phala/store'
import {validateAddress} from '@phala/utils'
import {useEffect, useState} from 'react'
import {down} from 'styled-breakpoints'
import {useBreakpoint} from 'styled-breakpoints/react-styled'
import {useAllTransferData, useToAddress} from '../../../store'
import {littleRoundButtonOverrides} from '../../../style/littleRoundButtonOverrides'
import {Button} from '../../Button'

export const FillMyAddress = () => {
  const [addressValid, setAddressValid] = useState(false)
  const [polkadotAccount] = useCurrentAccount()
  const polkadotAccountAddress = polkadotAccount?.address
  const [ethereumAccount] = useEthereumAccountAtom()
  const ethereumAccountAddress = ethereumAccount?.address
  const {toBlockchainType} = useAllTransferData()
  const isShowRecipient =
    toBlockchainType === 'polkadot'
      ? !!polkadotAccountAddress
      : !!ethereumAccountAddress
  const isMobile = useBreakpoint(down('sm'))
  const [toAddress, setToAddress] = useToAddress()

  useEffect(() => {
    setAddressValid(validateAddress(toAddress))
  }, [toAddress])

  function setMyAddress() {
    const address =
      toBlockchainType === 'polkadot'
        ? polkadotAccountAddress
        : ethereumAccountAddress

    setToAddress(address || '')
  }

  if (isShowRecipient && !addressValid && !isMobile) {
    return (
      <Button
        onClick={setMyAddress}
        overrides={{
          BaseButton: {
            style: {
              ...littleRoundButtonOverrides.BaseButton.style,
              width: '130px',
              backgroundColor: 'white',
            },
          },
        }}
      >
        My Address
      </Button>
    )
  } else {
    return null
  }
}
