import {usePolkadotAccountAtom} from '@phala/app-store'
import {
  // Input,
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
import styled from 'styled-components'
import {Input, SIZE} from 'baseui/input'

type Props = {
  visible: boolean
  onClose: () => void
}

const Spacer = styled.div`
  margin-top: 20px;
`

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
`

const InputWrapper = styled.div`
  padding: 12px 20px;
  background-color: #eee;
`

const BalanceText = styled.div`
  background-color: #eee;
  display: flex;
  justify-content: flex-end;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #8c8c8c;
  padding-top: 10px;
  padding-bottom: 2px;
`

const MaxButton = styled.span`
  display: inline-block;
  border-bottom: '1px solid #8C8C8C';
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  background: #ffffff;
  border-radius: 14px;
  padding: 6px 18px;
`

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
          size={SIZE.default}
          placeholder="Wallet address"
          overrides={{
            InputContainer: {
              style: () => ({
                backgroundColor: '#eee',
                paddingBottom: '10px',
                borderBottom: '1px solid #8C8C8C',
              }),
            },
            Input: {
              style: () => ({
                paddingLeft: 0,
                backgroundColor: '#eee',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '14px',
                lineHeight: '16px',
                color: '#111111',
              }),
            },
          }}
        />
      </InputWrapper>
      <Spacer></Spacer>
      <InputWrapper>
        <Input
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAmount(e.target.value)
          }
          size={SIZE.default}
          placeholder="Amount(PHA)"
          overrides={{
            InputContainer: {
              style: () => ({
                backgroundColor: '#eee',
                paddingBottom: '10px',
                borderBottom: '1px solid #8C8C8C',
              }),
            },
            Input: {
              style: () => ({
                paddingLeft: 0,
                backgroundColor: '#eee',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '14px',
                lineHeight: '16px',
                color: '#111111',
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
