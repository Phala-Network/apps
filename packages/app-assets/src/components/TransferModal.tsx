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
import {usePolkadotAccountTransferrableBalanceDecimal} from '@phala/react-hooks'
import {validateAddress, toFixed} from '@phala/utils'
import Decimal from 'decimal.js'
import React, {useCallback, useState, useMemo} from 'react'
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

const ASSET_ID_MAP = {
  BNC: 2,
  ZLK: 1,
}

type Props = {
  visible: boolean
  onClose: () => void
  token: 'BNC' | 'ZLK'
}

const TransferModal: React.FC<Props> = ({visible, onClose, token}) => {
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const {api} = useApiPromise()
  const [polkadotAccount] = usePolkadotAccountAtom()
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

        let extrinsic = api.tx.balances.transfer(address, amountString)
        if (token in ASSET_ID_MAP) {
          extrinsic = api.tx.assets.transfer(
            ASSET_ID_MAP[token],
            address,
            amountString
          )
        }

        const signer = (await web3FromAddress(polkadotAccount.address)).signer
        await waitSignAndSend({
          account: polkadotAccount.address,
          api,
          extrinsic,
          signer,
        })

        toast.success('Success')
        onClose()
      } catch (err) {
        toast.error((err as Error)?.message)
      }
    }
  }, [api, polkadotAccount, onClose, address, amount, decimals, token])

  return (
    <ModalWrapper visible={visible} onClose={onClose}>
      <ModalTitleWrapper>{`Transfer ${token}`}</ModalTitleWrapper>
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
          placeholder={`Amount(${token})`}
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
