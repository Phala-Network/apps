import {useTransactionsInfoAtom} from '@phala/app-store'
import {TransactionInfoItem} from '@phala/app-types'
import {
  useErc20BalanceQuery,
  useErc20Deposit,
  useEthereumBridgeFee,
  useTransactionReceiptQuery,
} from '@phala/react-libs'
import {u8aToHex} from '@polkadot/util'
import {decodeAddress} from '@polkadot/util-crypto'
import {ethers} from 'ethers'
import React, {useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import {SubmitStepProps} from '.'
import {Alert, Button, ModalAction, ModalActions, Spacer} from '../..'
import {StepProps} from '../BridgeProcess'
import {EthereumProgress} from '../EthereumProgress'
import useTransactionInfo from '../hooks/useTransactionInfo'
import BaseInfo from './BaseInfo'

type Props = SubmitStepProps & StepProps

const SubmitStepToKhala: React.FC<Props> = (props) => {
  const [transactionsInfoSuccess, setTransactionsInfoSuccess] = useState(false)
  const [transactionsInfo, setTransactionsInfo] = useTransactionsInfoAtom()
  const {onSubmit, onPrev, onSuccess, layout, data} = props
  const {from, to, amount: amountFromPrevStep} = data || {}
  const {account: accountFrom} = from || {}
  const {account: accountTo} = to || {}
  const submitDeposit = useErc20Deposit(accountFrom)
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const {transactionInfo} = useTransactionInfo(data)
  const [currentTransactionInfo, setCurrentTransactionInfo] = useState<{
    hash: string | undefined
    from: TransactionInfoItem
    to: TransactionInfoItem
  }>()
  const currentTransactionHash = currentTransactionInfo?.hash
  const {isLoading: isReceiptLoading} = useTransactionReceiptQuery(
    currentTransactionHash
  )
  const {refetch} = useErc20BalanceQuery(accountFrom)

  const ethFee = useEthereumBridgeFee()

  const submit = async () => {
    setSubmitting(true)

    const recipient = u8aToHex(decodeAddress(accountTo))

    try {
      const amount = ethers.utils.parseUnits(
        amountFromPrevStep?.toString() || '0',
        18
      )

      const response = await submitDeposit?.(amount, recipient)

      const newTransactionInfo = {
        ...transactionInfo,
        hash: response?.hash,
      }

      setCurrentTransactionInfo(newTransactionInfo)

      setTransactionsInfo([newTransactionInfo, ...transactionsInfo])
    } catch (error) {
      if (error instanceof Error) {
        console.error(error)
        toast(error.message)
      }

      setSubmitting(false)
    }
  }

  useEffect(() => {
    if (currentTransactionHash) {
      refetch()
      setTransactionsInfoSuccess(true)
      setSubmitting(false)
    }
  }, [
    currentTransactionHash,
    setSubmitting,
    setTransactionsInfoSuccess,
    refetch,
  ])

  return (
    <>
      <BaseInfo layout={layout} data={transactionInfo} />

      <Spacer></Spacer>

      {currentTransactionHash ? (
        <Alert>
          <EthereumProgress transactionHash={currentTransactionHash} />
        </Alert>
      ) : (
        <Alert>
          Please be patient as the transaction may take a few minutes.
        </Alert>
      )}

      {transactionsInfoSuccess && (
        <ModalActions>
          <ModalAction>
            <Button type="primary" onClick={onPrev}>
              Done
            </Button>
          </ModalAction>
        </ModalActions>
      )}

      {!transactionsInfoSuccess && (
        <ModalActions>
          <div style={{flex: 1}}>Fee: {ethFee?.toFixed(4)} ETH</div>

          {onPrev && !isSubmitting && !isReceiptLoading && (
            <ModalAction>
              <Button onClick={onPrev}>Back</Button>
            </ModalAction>
          )}
          {(onSubmit || onSuccess) && (
            <ModalAction>
              <Button loading={isSubmitting} type="primary" onClick={submit}>
                {isSubmitting ? 'Submitting' : 'Submit'}
              </Button>
            </ModalAction>
          )}
        </ModalActions>
      )}
    </>
  )
}

export default SubmitStepToKhala
