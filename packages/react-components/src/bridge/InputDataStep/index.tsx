import {useEthereumAccountAtom, usePolkadotAccountAtom} from '@phala/app-store'
import {
  useEthereumAccountBalanceDecimal,
  usePolkadotAccountBalanceDecimal,
} from '@phala/react-hooks'
import {validateAddress} from '@phala/utils'
import {Decimal} from 'decimal.js'
import React, {useEffect, useState} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {down} from 'styled-breakpoints'
import {useBreakpoint} from 'styled-breakpoints/react-styled'
import {
  Button,
  ErrorText,
  Input,
  InputAction,
  InputExternalInfo,
  InputNumber,
  KhalaToEthereumFee,
  ModalAction,
  ModalActions,
  Spacer,
  useKhalaBridgeFee,
  useToast,
} from '../..'
import {StepProps} from '../BridgeProcess'
import EthereumAllowance from '../EthereumAllowance'
import {EthereumToKhalaFee} from '../EthereumToKhalaFee'
import FormItem from '../FormItem'
import FormLayout from '../FormLayout'
import ActionButton from './ActionButton'
import TradeTypeSelect, {TradeTypeSelectValue} from './TradeTypeSelect'
import DEFAULT_VALUE from './TradeTypeSelect/DEFAULT_VALUE'

export type InputDataStepResult = {
  from: {
    type: string
    network: string
    account: string
    balance: Decimal
  }
  to: {
    type: string
    network: string
    account: string
  }
  amount: Decimal
}

type Props = {
  onNext: (data: InputDataStepResult) => void
  onCancel?(): void
} & StepProps

const InputDataStep: React.FC<Props> = (props) => {
  const isMobile = useBreakpoint(down('sm'))
  const {layout, onNext, onCancel} = props
  const [amountInput, setAmountInput] = useState<number>()
  const [recipient, setRecipient] = useState<string>('')
  const [polkadotAccount] = usePolkadotAccountAtom()
  const polkadotAccountAddress = polkadotAccount?.address
  const [ethereumAccount] = useEthereumAccountAtom()
  const ethereumAccountAddress = ethereumAccount?.address
  const [errorString, setErrorString] = useState('')
  const {fee} = useKhalaBridgeFee()
  const {toast} = useToast()

  const ethereumAccountBalanceDecimal = useEthereumAccountBalanceDecimal(
    ethereumAccountAddress
  )
  const polkadotAccountBalanceDecimal = usePolkadotAccountBalanceDecimal(
    polkadotAccountAddress
  )

  const [addressValid, setAddressValid] = useState(false)

  const [tradeTypeSelectValue, setTradeTypeSelectValue] =
    useState<TradeTypeSelectValue>(DEFAULT_VALUE)

  const isFromEthereum = tradeTypeSelectValue.from.network === 'ethereum'
  const isFromKhala = !isFromEthereum
  const currentAddress = isFromEthereum
    ? ethereumAccountAddress
    : polkadotAccountAddress

  const currentBalance = isFromEthereum
    ? ethereumAccountBalanceDecimal
    : polkadotAccountBalanceDecimal

  const maxAmount = currentBalance.toNumber()

  const isShowMaxButton = maxAmount > 0 && isFromEthereum

  const isShowRecipient = isFromEthereum
    ? !!polkadotAccountAddress
    : !!ethereumAccountAddress

  useEffect(() => {
    setAddressValid(validateAddress(recipient))
  }, [recipient])

  function setMyAddress() {
    const address = isFromEthereum
      ? polkadotAccountAddress
      : ethereumAccountAddress

    setRecipient(address || '')
  }

  function setMax() {
    setAmountInput(maxAmount)
  }

  const onTradeTypeSelectChange = (value: TradeTypeSelectValue) => {
    setTradeTypeSelectValue(value)
    setErrorString('')
  }

  useEffect(() => {
    setRecipient('')
  }, [currentAddress])

  const submit = () => {
    const accountFrom = isFromEthereum
      ? ethereumAccountAddress
      : polkadotAccountAddress
    const amountTo = amountInput
    let errorString = ''

    setErrorString(errorString)

    if (!amountTo || amountTo <= 0) {
      errorString = 'Need enter amount'
    } else if (!recipient) {
      errorString = 'Need enter recipient'
    } else if (isFromEthereum && !validateAddress(recipient)) {
      errorString = 'Need enter the correct recipient'
    } else if (!accountFrom) {
      errorString = 'Need login'
    } else if (
      isFromKhala &&
      !new RegExp(/0x[0-9a-fA-F]{40}/).test(recipient)
    ) {
      errorString = 'Need enter the correct recipient'
    } else if (isFromKhala && !fee) {
      errorString = 'Please wait fee check'
    } else if (isFromKhala && fee?.toString() === '0') {
      errorString = 'Please wait fee check'
    } else if (new Decimal(amountTo).greaterThan(new Decimal(maxAmount))) {
      errorString = 'Insufficient balance'
    } else if (
      isFromKhala &&
      fee &&
      new Decimal(amountTo).greaterThan(new Decimal(maxAmount).sub(fee))
    ) {
      errorString = 'Insufficient balance'
    }

    if (errorString) {
      isMobile
        ? toast({
            text: errorString,
          })
        : setErrorString(errorString)
      return
    }

    onNext({
      from: {
        ...tradeTypeSelectValue.from,
        // NOTE: The code is checked
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        account: accountFrom!,
        balance: currentBalance,
      },
      to: {
        ...tradeTypeSelectValue.to,
        account: recipient,
      },
      // NOTE: The code is checked
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      amount: new Decimal(amountTo!),
    })
  }

  return (
    <>
      <div style={{height: 26}}>
        <InputExternalInfo
          label={'Balance'}
          type={'PHA'}
          value={currentBalance}
        />
      </div>

      <FormLayout layout={layout}>
        <FormItem>
          <TradeTypeSelect
            disableSelect={true}
            value={tradeTypeSelectValue}
            onChange={onTradeTypeSelectChange}
          />
        </FormItem>

        <Spacer />

        <FormItem>
          <InputNumber
            size="large"
            onChange={(value) => {
              setAmountInput(value as number)
              setErrorString('')
            }}
            value={amountInput}
            min={0.00000001}
            placeholder="Amount (PHA)"
            after={
              isShowMaxButton ? (
                <InputAction onClick={setMax}>MAX</InputAction>
              ) : null
            }
          />

          <Spacer y={1.2} />

          <Input
            value={recipient}
            onChange={(value) => {
              setRecipient(value)
              setErrorString('')
            }}
            size="large"
            placeholder="Destination Address"
            after={
              isShowRecipient && !addressValid && !isMobile ? (
                <InputAction onClick={setMyAddress}>MY ADDRESS</InputAction>
              ) : null
            }
          />
        </FormItem>
      </FormLayout>

      <ModalActions>
        <div style={{padding: 8, flex: 1}}>
          {isFromKhala && <KhalaToEthereumFee />}
          {isFromEthereum && <EthereumToKhalaFee />}
        </div>

        {onCancel && (
          <ModalAction>
            <Button onClick={onCancel}>Cancel</Button>
          </ModalAction>
        )}

        <ModalAction>
          {ethereumAccount && isFromEthereum && (
            <ErrorBoundary fallbackRender={() => null}>
              <EthereumAllowance
                placeholder={<Button type="primary">Approve</Button>}
                account={ethereumAccount.address}>
                <Button type="primary" onClick={submit}>
                  Next
                </Button>
              </EthereumAllowance>
            </ErrorBoundary>
          )}

          {!isFromEthereum && (
            <ActionButton
              isFromEthereum={isFromEthereum}
              onClick={submit}></ActionButton>
          )}
        </ModalAction>
      </ModalActions>

      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <ErrorText>{errorString}</ErrorText>
      </div>
    </>
  )
}

export default InputDataStep
