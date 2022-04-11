import {Alert, Spacer} from '@phala/react-components'
import {
  useErc20BalanceQuery,
  useErc20Deposit,
  useTransactionReceiptQuery,
} from '@phala/react-libs'
import {u8aToHex} from '@polkadot/util'
import {decodeAddress} from '@polkadot/util-crypto'
import {Block} from 'baseui/block'
import {KIND} from 'baseui/button'
import {ModalBody, ModalButton, ModalFooter} from 'baseui/modal'
import {ethers} from 'ethers'
import React, {Fragment, useEffect, useState} from 'react'
import {useAllTransferData} from '../../../../store'
import {buttonOverrides} from '../../../../style/buttonOverrides'
import {Button} from '../../../Button'
import {CurrentTransferInformationDetailItems} from '../../../CurrentTransferInformationDetailItems'
import {EthereumToKhalaFee} from './EthereumToKhalaFee'
import {StyledLink} from 'baseui/link'
import {toaster} from 'baseui/toast'

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
    } catch (error) {
      if (error instanceof Error) {
        console.error(error)
        toaster.negative(error.message, {})
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
      <ModalBody>
        <CurrentTransferInformationDetailItems />

        <Spacer></Spacer>

        <EthereumToKhalaFee />

        <Spacer></Spacer>

        {currentTransactionHash ? (
          <Alert>
            {/* Temporary copywriting */}
            <span>
              Transaction has been sent, it may take some time ranged from a few
              seconds to a few hours. Transaction：
              <StyledLink
                href={`https://etherscan.io/tx/${currentTransactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {currentTransactionHash}
              </StyledLink>
            </span>
          </Alert>
        ) : (
          <Alert>
            Please be patient as the transaction may take a few minutes.
          </Alert>
        )}
      </ModalBody>

      {transactionsInfoSuccess && (
        <ModalFooter>
          <Button
            overrides={{
              BaseButton: {
                style: {
                  width: '100%',
                  ...buttonOverrides.BaseButton.style,
                },
              },
            }}
            onClick={onCloseTransfer}
          >
            Done
          </Button>
        </ModalFooter>
      )}

      {!transactionsInfoSuccess && (
        <ModalFooter>
          <Block
            display="flex"
            justifyContent="space-between"
            alignItems="stretch"
          >
            {onCloseTransfer && !isSubmitting && !isReceiptLoading && (
              <Fragment>
                <Block flex={1}>
                  <ModalButton
                    overrides={{
                      BaseButton: {
                        style: {
                          backgroundColor: '#EEEEEE',
                          width: '100%',
                        },
                      },
                    }}
                    onClick={onCloseTransfer}
                    kind={KIND.tertiary}
                  >
                    Back
                  </ModalButton>
                </Block>

                <Block width={['20px']} />
              </Fragment>
            )}

            <Block flex={1}>
              <Button
                overrides={{
                  BaseButton: {
                    style: {
                      width: '100%',
                      ...buttonOverrides.BaseButton.style,
                    },
                  },
                }}
                isLoading={isSubmitting}
                onClick={submit}
              >
                {isSubmitting ? 'Submitting' : 'Submit'}
              </Button>
            </Block>
          </Block>
        </ModalFooter>
      )}
    </>
  )
}
