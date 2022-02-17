import {useEthereumAccountAtom, usePolkadotAccountAtom} from '@phala/app-store'
import {validateAddress} from '@phala/utils'
import {useEffect, useState} from 'react'
import {down} from 'styled-breakpoints'
import {useBreakpoint} from 'styled-breakpoints/react-styled'
import {useToAddress} from '../../../store'
import {littleRoundButtonOverrides} from '../../../style/littleRoundButtonOverrides'
import {useBridgePage} from '../../../useBridgePage'
import {Button} from '../../Button'

export const FillMyAddress = () => {
  const [addressValid, setAddressValid] = useState(false)
  const [polkadotAccount] = usePolkadotAccountAtom()
  const polkadotAccountAddress = polkadotAccount?.address
  const [ethereumAccount] = useEthereumAccountAtom()
  const ethereumAccountAddress = ethereumAccount?.address
  const {isFromEthereum} = useBridgePage()
  const isShowRecipient = isFromEthereum
    ? !!polkadotAccountAddress
    : !!ethereumAccountAddress
  const isMobile = useBreakpoint(down('sm'))
  const [toAddress, setToAddress] = useToAddress()

  useEffect(() => {
    setAddressValid(validateAddress(toAddress))
  }, [toAddress])

  function setMyAddress() {
    const address = isFromEthereum
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
