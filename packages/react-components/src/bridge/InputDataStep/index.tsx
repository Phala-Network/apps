import {useEthereumAccountAtom, usePolkadotAccountAtom} from '@phala/app-store'
import {
  useEthereumAccountBalanceDecimal,
  usePolkadotAccountBalanceDecimal,
} from '@phala/react-hooks'
import {useTranslation} from '@phala/react-i18n'
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
  ModalAction,
  ModalActions,
  Spacer,
  useToast,
} from '../..'
import {StepProps} from '../BridgeProcess'
import EthereumAllowance from '../EthereumAllowance'
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
  const {t} = useTranslation()
  const isMobile = useBreakpoint(down('sm'))
  const {layout, onNext, onCancel} = props
  const [amountInput, setAmountInput] = useState<number>()
  const [recipient, setRecipient] = useState<string>('')
  const [polkadotAccount] = usePolkadotAccountAtom()
  const polkadotAccountAddress = polkadotAccount?.address
  const [ethereumAccount] = useEthereumAccountAtom()
  const ethereumAccountAddress = ethereumAccount?.address
  const [errorString, setErrorString] = useState('')
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

    if (!amountTo) {
      errorString = t('bridge.need_enter_amount')
    } else if (!recipient || !validateAddress(recipient)) {
      errorString = t('bridge.need_enter_recipient')
    } else if (!accountFrom) {
      errorString = t('bridge.need_login')
    } else if (new Decimal(amountTo).greaterThan(new Decimal(maxAmount))) {
      errorString = t('bridge.need_insufficient_balance')
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
          label={t('bridge.balance')}
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
            placeholder={t('bridge.amount')}
            after={
              isShowMaxButton ? (
                <InputAction onClick={setMax}>{t('bridge.max')}</InputAction>
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
            placeholder={t('bridge.destination_address')}
            after={
              isShowRecipient && !addressValid && !isMobile ? (
                <InputAction onClick={setMyAddress}>
                  {t('bridge.my_address')}
                </InputAction>
              ) : null
            }
          />
        </FormItem>
      </FormLayout>

      <ModalActions>
        {onCancel && (
          <ModalAction>
            <Button onClick={onCancel}>Cancel</Button>
          </ModalAction>
        )}

        <ModalAction>
          {ethereumAccount && isFromEthereum && (
            <ErrorBoundary fallbackRender={() => null}>
              <EthereumAllowance
                placeholder={
                  <Button type="primary">{t('bridge.approve')}</Button>
                }
                account={ethereumAccount.address}
              >
                <Button type="primary" onClick={submit}>
                  {t('bridge.next')}
                </Button>
              </EthereumAllowance>
            </ErrorBoundary>
          )}

          {!isFromEthereum && (
            <ActionButton
              isFromEthereum={isFromEthereum}
              onClick={submit}
            ></ActionButton>
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
