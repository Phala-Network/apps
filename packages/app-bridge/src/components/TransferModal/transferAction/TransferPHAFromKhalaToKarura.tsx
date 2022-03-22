// import {useKhalaBridgeFee} from '../..'
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
import {Block} from 'baseui/block'
import {KIND as ButtonKind} from 'baseui/button'
import {StyledLink} from 'baseui/link'
import {ModalBody, ModalButton, ModalFooter} from 'baseui/modal'
import Decimal from 'decimal.js'
import React, {Fragment, useEffect, useMemo, useState} from 'react'
import {karuraBridgeFee, karuraParaId} from '../../../config'
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
  const {onCloseTransfer} = props
  const allTransactionsInfo = useAllTransferData()
  const fromAddress = allTransactionsInfo.fromAddress
  const toAddress = allTransactionsInfo.toAddress
  const amountDecimal = allTransactionsInfo.amountDecimal
  const {api} = useApiPromise()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const [submittedHashBoolean, setSubmittedHashBoolean] =
    useState<boolean>(false)
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const [progressIndex, setProgressIndex] = useState(-1)
  const [transactionFee, setTransactionFee] = useState('')
  const [transactionHash, setTransactionHash] = useState('')

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
    extrinsic?.paymentInfo(fromAddress).then(({partialFee}) => {
      setTransactionFee(
        `${new Decimal(partialFee.toString()).div(10 ** 12).toFixed(8)} PHA`
      )
    })
  }, [fromAddress, extrinsic])

  const submit = async () => {
    if (!api || !extrinsic) {
      return
    }

    try {
      setSubmitting(true)
      const web3FromAddress = (await import('@polkadot/extension-dapp'))
        .web3FromAddress

      const signer = (await web3FromAddress(fromAddress)).signer

      const hash = await waitSignAndSend?.({
        api,
        account: fromAddress,
        extrinsic,
        signer,
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
      if (hash) {
        setTransactionHash(hash.toString())
      }
    } catch (e) {
      console.error(e)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <ModalBody>
        <CurrentTransferInformationDetailItems bridgeFee={karuraBridgeFee} />

        <Spacer></Spacer>

        {progressIndex === -1 && (
          <>
            <Alert>
              <span>
                This transaction will charge a{' '}
                <span style={{fontWeight: 'bold'}}>
                  {formatCurrency(karuraBridgeFee)} PHA
                </span>{' '}
                bridge fee to cover the resource cost of the destination chain.
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
        )}

        {progressIndex === -1 && (
          <>
            <Spacer />
            <FeeLabel fee={transactionFee || '-'} label={'Fee'} />
          </>
        )}

        {transactionHash && (
          <>
            <Spacer></Spacer>
            <Alert>
              <span>
                Transaction has been sent, it may take some time ranged from a
                few seconds to a few hours. Transaction：
                <StyledLink
                  href={`https://khala.subscan.io/extrinsic/${transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {transactionHash}
                </StyledLink>
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
