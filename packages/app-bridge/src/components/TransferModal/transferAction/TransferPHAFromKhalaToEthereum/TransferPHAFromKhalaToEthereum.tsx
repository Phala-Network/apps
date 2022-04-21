import {useCurrentAccount} from '@phala/store'
import {Alert, Checkbox, FeeLabel, Spacer} from '@phala/react-components'
import {Link} from '@phala/react-components/src/Announcement/styledComponents'
import {
  decimalToBalance,
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
  waitSignAndSend,
} from '@phala/react-libs'
import {Block} from 'baseui/block'
import {KIND as ButtonKind} from 'baseui/button'
import {ModalBody, ModalButton, ModalFooter} from 'baseui/modal'
import {toaster} from 'baseui/toast'
import Decimal from 'decimal.js'
import {getAddress} from 'ethers/lib/utils'
import React, {Fragment, useEffect, useMemo, useState} from 'react'
import {useKhalaBridgeFee} from '../../../../hooks/useKhalaBridgeFee'
import {useAllTransferData} from '../../../../store'
import {buttonOverrides} from '../../../../style/buttonOverrides'
import {Button} from '../../../Button'
import {CurrentTransferInformationDetailItems} from '../../../CurrentTransferInformationDetailItems'

interface TransferPHAFromKhalaToEthereumProps {
  onCloseTransfer(): void
}

export const TransferPHAFromKhalaToEthereum: React.FC<
  TransferPHAFromKhalaToEthereumProps
> = (props) => {
  const {onCloseTransfer} = props
  const allTransactionsInfo = useAllTransferData()
  const toAddress = allTransactionsInfo.toAddress
  const amountDecimal = allTransactionsInfo.amountDecimal
  const {api} = useApiPromise()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const [submittedHashBoolean, setSubmittedHashBoolean] =
    useState<boolean>(false)
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const [progressIndex, setProgressIndex] = useState(-1)
  const fee = useKhalaBridgeFee()
  const [checkBoxChecked, setCheckBoxChecked] = useState<boolean>(false)
  const [transactionFee, setTransactionFee] = useState('')
  const [currentAccount] = useCurrentAccount()

  const amount = useMemo(() => {
    if (!amountDecimal || !api || !decimals || !fee) return

    return decimalToBalance(amountDecimal.minus(fee), decimals, api)
  }, [amountDecimal, api, decimals, fee])

  const extrinsic = useMemo(() => {
    const accountToAddress = getAddress(toAddress)

    return api?.tx.bridgeTransfer?.transferNative?.(amount, accountToAddress, 0)
  }, [amount, api, toAddress])

  useEffect(() => {
    if (extrinsic && currentAccount?.address) {
      extrinsic.paymentInfo(currentAccount.address).then(({partialFee}) => {
        setTransactionFee(
          `${new Decimal(partialFee.toString()).div(10 ** 12).toFixed(8)} PHA`
        )
      })
    }
  }, [extrinsic, currentAccount?.address])

  const submit = async () => {
    if (!checkBoxChecked) {
      toaster.warning('Please check the risk warning.', {})
      return
    }

    if (!extrinsic || !currentAccount?.wallet?.signer || !api) {
      return
    }

    try {
      setSubmitting(true)

      waitSignAndSend({
        account: currentAccount?.address,
        extrinsic,
        api,
        signer: currentAccount.wallet.signer,
        onstatus: (status) => {
          if (status.isReady) {
            setProgressIndex(0)
          } else if (status.isBroadcast) {
            setProgressIndex(1)
          } else if (status.isInBlock) {
            setProgressIndex(2)
            setSubmittedHashBoolean(true)
          } else if (status.isFinalized) {
            setProgressIndex(3)
            setSubmittedHashBoolean(true)
          }
        },
      })
    } catch (e) {
      console.error(e)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <ModalBody>
        <CurrentTransferInformationDetailItems bridgeFee={fee} />

        <Spacer></Spacer>

        {progressIndex === -1 ? (
          <>
            <Alert>
              <span>
                This transaction will charge a{' '}
                <span style={{fontWeight: 'bold'}}>
                  {fee?.toFixed(2) || '-'} PHA
                </span>{' '}
                bridge fee to cover the Ethereum gas fee (up to 120 GWei price).
              </span>
            </Alert>
            <Spacer />
            <Alert>
              The transaction may take some time ranged from a few seconds to a
              few hours, depending on if the Ethereum blockchain is congested.
              In the case of congestion, it may be necessary to wait for more
              than 24h.
            </Alert>
          </>
        ) : (
          <Alert>
            <span>
              The transaction may take some time ranged from a few seconds to a
              few hours, depending on if the Ethereum blockchain is congested.
              In the case of congestion, it may be necessary to wait for more
              than 24h. You can follow each step of the transaction through{' '}
              <Link
                target="_blank"
                href={`https://khala.subscan.io/account/${currentAccount?.address}?tab=transfer`}
              >
                Khala&apos;s explorer
              </Link>{' '}
              and{' '}
              <Link
                target="_blank"
                href={`https://etherscan.io/address/${toAddress}#tokentxns`}
              >
                Ethereum&apos;s explorer
              </Link>{' '}
              once you confirm it. If it has not arrived after 24 hours, you can
              post on the{' '}
              <Link
                target="_blank"
                href={`https://forum.phala.network/c/support/function/33`}
              >
                forum
              </Link>{' '}
              or leave a message on{' '}
              <Link
                target="_blank"
                href={`https://discord.com/invite/SvdKgHfhTG#product-feedback`}
              >
                Discord #product-feedback
              </Link>{' '}
              for support.
            </span>
          </Alert>
        )}

        {progressIndex === -1 && (
          <label
            style={{
              display: 'flex',
              fontSize: 14,
              padding: '8px 0',
              margin: '8px 0',
            }}
          >
            <div>
              <Checkbox
                checked={checkBoxChecked}
                onChange={setCheckBoxChecked}
              ></Checkbox>
            </div>
            <div style={{padding: '2px 2px'}}>
              I understood the transaction can take long time and the bridge fee
              is used to cover the Ethereum gas fee.
            </div>
          </label>
        )}

        {progressIndex === -1 && (
          <FeeLabel fee={transactionFee || '-'} label={'Fee'} />
        )}

        {progressIndex > 1 && (
          <>
            <Spacer></Spacer>
            <Alert>
              <span>
                Transaction has been sent, it may take some time ranged from a
                few seconds to a few hours.
              </span>
            </Alert>
          </>
        )}
      </ModalBody>

      {submittedHashBoolean && (
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
            onClick={() => {
              onCloseTransfer?.()
              setProgressIndex(-1)
            }}
          >
            Collapse
          </Button>
        </ModalFooter>
      )}

      {!submittedHashBoolean && (
        <ModalFooter>
          <Block
            display="flex"
            justifyContent="space-between"
            alignItems="stretch"
          >
            {onCloseTransfer && !isSubmitting && (
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
                    kind={ButtonKind.tertiary}
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
