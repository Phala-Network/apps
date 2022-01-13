import {
  Alert,
  Button,
  ModalAction,
  ModalActions,
  Spacer,
  toast,
} from '@phala/react-components'
import {
  useErc20BalanceQuery,
  useErc20Deposit,
  useTransactionReceiptQuery,
} from '@phala/react-libs'
import {u8aToHex} from '@polkadot/util'
import {decodeAddress} from '@polkadot/util-crypto'
import {ethers} from 'ethers'
import React, {useEffect, useState} from 'react'
import {useAllTransferData} from '../../../../store'
import {CurrentTransferInformationDetailItems} from '../../../CurrentTransferInformationDetailItems'
import {EthereumProgress} from './EthereumProgress'
import {EthereumToKhalaFee} from './EthereumToKhalaFee'
// import useTransactionInfo from '../hooks/useTransactionInfo'
// import BaseInfo from './BaseInfo'

interface TransferPHAFromEthereumToKhalaProps {
  onCloseTransfer(): void
}

export const TransferPHAFromEthereumToKhala: React.FC<
  TransferPHAFromEthereumToKhalaProps
> = (props) => {
  const [transactionsInfoSuccess, setTransactionsInfoSuccess] = useState(false)
  const {onCloseTransfer} = props
  const allTransactionsInfo = useAllTransferData()
  const fromAddress = allTransactionsInfo.fromAddress
  const toAddress = allTransactionsInfo.toAddress
  const amountDecimal = allTransactionsInfo.amountDecimal
  const submitDeposit = useErc20Deposit(fromAddress)
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  // const {transactionInfo} = useTransactionInfo(data)
  const [currentTransactionInfo, setCurrentTransactionInfo] = useState<{
    hash: string | undefined
  }>()
  const currentTransactionHash = currentTransactionInfo?.hash
  const {isLoading: isReceiptLoading} = useTransactionReceiptQuery(
    currentTransactionHash
  )
  const {refetch} = useErc20BalanceQuery(fromAddress)

  const submit = async () => {
    setSubmitting(true)

    const recipient = u8aToHex(decodeAddress(toAddress))

    try {
      const amount = ethers.utils.parseUnits(
        amountDecimal?.toString() || '0',
        18
      )

      const response = await submitDeposit?.(amount, recipient)

      const newTransactionInfo = {
        hash: response?.hash,
      }

      setCurrentTransactionInfo(newTransactionInfo)

      // setTransactionsInfo([newTransactionInfo, ...transactionsInfo])
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
      <CurrentTransferInformationDetailItems />

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
            <Button type="primary" onClick={onCloseTransfer}>
              Done
            </Button>
          </ModalAction>
        </ModalActions>
      )}

      {!transactionsInfoSuccess && (
        <ModalActions>
          <div style={{flex: 1}}>
            <EthereumToKhalaFee />
          </div>

          {onCloseTransfer && !isSubmitting && !isReceiptLoading && (
            <ModalAction>
              <Button onClick={onCloseTransfer}>Back</Button>
            </ModalAction>
          )}

          <ModalAction>
            <Button loading={isSubmitting} type="primary" onClick={submit}>
              {isSubmitting ? 'Submitting' : 'Submit'}
            </Button>
          </ModalAction>
        </ModalActions>
      )}
    </>
  )
}
