import {
  ModalButtonWrapper,
  ModalFooterWrapper,
  ModalTitleWrapper,
  ModalWrapper,
  PolkadotTransactionFeeLabel,
} from '@phala/react-components'
import {usePolkadotAccountTransferrableBalanceDecimal} from '@phala/react-hooks'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
  waitSignAndSend,
} from '@phala/react-libs'
import {useCurrentAccount} from '@phala/store'
import {toFixed, validateAddress} from '@phala/utils'
import {Input} from 'baseui/input'
import {toaster} from 'baseui/toast'
import Decimal from 'decimal.js'
import React, {useMemo, useState} from 'react'
import {
  BalanceText,
  ButtonContainer,
  inputStyle,
  InputWrapper,
  MaxButton,
  Spacer,
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
  const [polkadotAccount] = useCurrentAccount()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)

  const polkadotAccountAddress = polkadotAccount?.address
  const polkadotTransferBalanceDecimal =
    usePolkadotAccountTransferrableBalanceDecimal(polkadotAccountAddress)
  const isShowMaxButton = polkadotTransferBalanceDecimal.greaterThan('0.003')

  const transferrableValue = useMemo(() => {
    if (!polkadotTransferBalanceDecimal) return '-'
    return `${toFixed(polkadotTransferBalanceDecimal)} PHA`
  }, [polkadotTransferBalanceDecimal])

  const handleMax = () => {
    if (!polkadotTransferBalanceDecimal) return
    const maxValue = polkadotTransferBalanceDecimal.sub('0.003').toString()
    setAmount(maxValue)
  }

  const submit = async () => {
    if (api && polkadotAccount && polkadotAccount.wallet?.signer && decimals) {
      let amountString: string

      if (!validateAddress(address)) {
        toaster.negative('Invalid address', {})
        return
      }

      try {
        amountString = new Decimal(amount).mul(decimals).toString()
      } catch (err) {
        toaster.negative('Invalid amount', {})
        return
      }

      try {
        await waitSignAndSend({
          account: polkadotAccount.address,
          api,
          extrinsic: api.tx.balances.transfer(address, amountString),
          signer: polkadotAccount.wallet.signer,
        })

        toaster.positive('Success', {})
        onClose()
      } catch (err) {
        toaster.negative((err as Error)?.message, {})
      }
    }
  }

  return (
    <ModalWrapper visible={visible} onClose={onClose}>
      <ModalTitleWrapper>Transfer PHA</ModalTitleWrapper>
      <InputWrapper>
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Wallet address"
          overrides={inputStyle}
        />
      </InputWrapper>
      <Spacer></Spacer>
      <InputWrapper>
        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder="Amount(PHA)"
          overrides={{
            ...inputStyle,
            Input: {
              style: () => ({
                paddingLeft: 0,
                paddingBottom: '16px',
                color: '#111',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '32px',
                lineHeight: '32px',
                '::placeholder': {
                  color: '#8C8C8C',
                  transform: 'scale(0.45)',
                  transformOrigin: 'center left',
                  fontWeight: 'normal',
                },
              }),
            },
            EndEnhancer: {
              style: () => ({
                borderBottom: '1px solid #8C8C8C',
                paddingRight: 0,
                backgroundColor: '#eee',
              }),
            },
          }}
          endEnhancer={() =>
            isShowMaxButton ? (
              <MaxButton onClick={handleMax}>Max</MaxButton>
            ) : null
          }
        />
        <BalanceText>{`Balance: ${transferrableValue}`}</BalanceText>
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
              submit().finally(() => setLoading(false))
            }}
            type="submit"
          >
            {loading ? 'Submitting' : 'Submit'}
          </ModalButtonWrapper>
        </ButtonContainer>
      </ModalFooterWrapper>
    </ModalWrapper>
  )
}

export default TransferModal
