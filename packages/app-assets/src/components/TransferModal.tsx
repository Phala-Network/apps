import {usePolkadotAccountAtom} from '@phala/app-store'
import {
  PolkadotTransactionFeeLabel,
  ModalWrapper,
  ModalTitleWrapper,
  ModalFooterWrapper,
  ModalButtonWrapper,
} from '@phala/react-components'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
  waitSignAndSend,
} from '@phala/react-libs'
import {validateAddress} from '@phala/utils'
import Decimal from 'decimal.js'
import React, {useCallback, useState} from 'react'
import {toast} from 'react-toastify'
import {Input} from 'baseui/input'
import {
  Spacer,
  ButtonContainer,
  InputWrapper,
  BalanceText,
  MaxButton,
  inputStyle,
} from './styledComponents'

type Props = {
  visible: boolean
  onClose: () => void
}

const TransferModal: React.FC<Props> = ({visible, onClose}) => {
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const {api} = useApiPromise()
  const [polkadotAccount] = usePolkadotAccountAtom()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)

  const confirm = useCallback(async () => {
    if (api && polkadotAccount && decimals) {
      let amountString: string

      if (!validateAddress(address)) {
        toast.error('Invalid address')
        return
      }

      try {
        amountString = new Decimal(amount).mul(decimals).toString()
      } catch (err) {
        toast.error('Invalid amount')
        return
      }

      try {
        const {web3FromAddress} = await import('@polkadot/extension-dapp')

        const signer = (await web3FromAddress(polkadotAccount.address)).signer
        await waitSignAndSend({
          account: polkadotAccount.address,
          api,
          extrinsic: api.tx.balances.transfer(address, amountString),
          signer,
        })

        toast.success('Success')
        onClose()
      } catch (err) {
        toast.error((err as Error)?.message)
      }
    }
  }, [api, polkadotAccount, onClose, address, amount, decimals])

  return (
    <ModalWrapper visible={visible} onClose={onClose}>
      <ModalTitleWrapper>Transfer PHA</ModalTitleWrapper>
      <InputWrapper>
        <Input
          value={address}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAddress(e.target.value)
          }
          placeholder="Wallet address"
          overrides={inputStyle}
        />
      </InputWrapper>
      <Spacer></Spacer>
      <InputWrapper>
        <Input
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAmount(e.target.value)
          }
          type="number"
          placeholder="Amount(PHA)"
          overrides={{
            ...inputStyle,
            EndEnhancer: {
              style: () => ({
                borderBottom: '1px solid #8C8C8C',
                paddingRight: 0,
                backgroundColor: '#eee',
              }),
            },
          }}
          endEnhancer={() => <MaxButton>Max</MaxButton>}
        />
        <BalanceText>Balance: 1.1111 PHA</BalanceText>
      </InputWrapper>
      <Spacer></Spacer>
      <PolkadotTransactionFeeLabel
        key="PolkadotTransactionFeeLabel"
        sender={polkadotAccount?.address}
        recipient={address}
        amount={amount}
      />
      <ModalFooterWrapper>
        <ButtonContainer>
          <ModalButtonWrapper onClick={onClose}>Cancel</ModalButtonWrapper>
          <ModalButtonWrapper
            disabled={loading}
            onClick={() => {
              setLoading(true)
              confirm().finally(() => setLoading(false))
            }}
            type="submit"
          >
            {loading ? 'Confirming' : 'Confirm'}
          </ModalButtonWrapper>
        </ButtonContainer>
      </ModalFooterWrapper>
    </ModalWrapper>
  )
}

export default TransferModal
