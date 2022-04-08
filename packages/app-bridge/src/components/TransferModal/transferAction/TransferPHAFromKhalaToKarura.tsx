import {useCurrentAccount} from '@phala/app-store'
import {Alert, FeeLabel, Spacer} from '@phala/react-components'
import {
  decimalToBalance,
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
  waitSignAndSend,
} from '@phala/react-libs'
import {formatCurrency} from '@phala/utils'
import {u8aToHex} from '@polkadot/util'
import {decodeAddress} from '@polkadot/util-crypto'
import {useStyletron} from 'baseui'
import {Block} from 'baseui/block'
import {KIND as ButtonKind} from 'baseui/button'
import {ModalBody, ModalButton, ModalFooter} from 'baseui/modal'
import Decimal from 'decimal.js'
import React, {Fragment, useEffect, useMemo, useState} from 'react'
import {toKaruraXcmFee, karuraParaId} from '../../../config'
import {useAllTransferData} from '../../../store'
import {buttonOverrides} from '../../../style/buttonOverrides'
import {Button} from '../../Button'
import {CurrentTransferInformationDetailItems} from '../../CurrentTransferInformationDetailItems'

interface TransferPHAFromKhalaToKaruraProps {
  onCloseTransfer(): void
}

export const TransferPHAFromKhalaToKarura: React.FC<
  TransferPHAFromKhalaToKaruraProps
> = (props) => {
  const [css] = useStyletron()
  const {onCloseTransfer} = props
  const allTransactionsInfo = useAllTransferData()
  const [currentAccount] = useCurrentAccount()
  const toAddress = allTransactionsInfo.toAddress
  const amountDecimal = allTransactionsInfo.amountDecimal
  const {api} = useApiPromise()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const [submittedHashBoolean, setSubmittedHashBoolean] =
    useState<boolean>(false)
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const [progressIndex, setProgressIndex] = useState(-1)
  const [transactionFee, setTransactionFee] = useState('')

  const amount = useMemo(() => {
    if (!amountDecimal || !api || !decimals) return

    return decimalToBalance(amountDecimal, decimals, api)
  }, [amountDecimal, api, decimals])

  const extrinsic = useMemo(() => {
    if (api) {
      return api.tx.xcmTransfer?.transferNative?.(
        api.createType('XcmV1MultiLocation', {
          parents: 1,
          interior: api.createType('Junctions', {
            X2: [
              api.createType('XcmV1Junction', {
                Parachain: api.createType('Compact<U32>', karuraParaId),
              }),
              api.createType('XcmV1Junction', {
                AccountId32: {
                  network: api.createType('XcmV0JunctionNetworkId', 'Any'),
                  id: u8aToHex(decodeAddress(toAddress)),
                },
              }),
            ],
          }),
        }),
        amount,
        6000000000
      )
    }
    return
  }, [amount, api, toAddress])

  useEffect(() => {
    let unmounted = false
    if (currentAccount?.address) {
      extrinsic?.paymentInfo(currentAccount.address).then(({partialFee}) => {
        if (unmounted) return
        setTransactionFee(
          `${new Decimal(partialFee.toString()).div(10 ** 12).toFixed(8)} PHA`
        )
      })
    }
    return () => {
      unmounted = true
    }
  }, [currentAccount?.address, extrinsic])

  const submit = async () => {
    if (!api || !extrinsic || !currentAccount?.wallet?.signer) {
      return
    }

    try {
      setSubmitting(true)

      await waitSignAndSend?.({
        api,
        account: currentAccount.address,
        extrinsic,
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
        <CurrentTransferInformationDetailItems bridgeFee={toKaruraXcmFee} />

        <Spacer></Spacer>

        {progressIndex === -1 && (
          <>
            <Alert>
              <span className={css({wordBreak: 'break-word'})}>
                A destination chain transfer fee of{' '}
                <span style={{fontWeight: 'bold'}}>
                  {formatCurrency(toKaruraXcmFee)} PHA
                </span>{' '}
                will be charged for transferring from Khala to Karura. The
                bridge itself is completely free. This fee is only used to pay
                the xcm fee of the Karura chain, not including the transaction
                fee of the Khala chain.
              </span>
            </Alert>
            <Spacer />
            <Alert>The transaction may take within 1 minute.</Alert>
          </>
        )}

        {progressIndex === -1 && (
          <>
            <Spacer />
            <FeeLabel fee={transactionFee || '-'} label={'Fee'} />
          </>
        )}

        {progressIndex > 1 && (
          <>
            <Spacer></Spacer>
            <Alert>
              <span>The transaction may take up to 1 minute to complete. </span>
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
