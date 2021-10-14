import {
  decimalToBalance,
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
  useTransferSubmit,
} from '@phala/react-libs'
import {Hash} from '@polkadot/types/interfaces'
import {Decimal} from 'decimal.js'
import {getAddress} from 'ethers/lib/utils'
import React, {useMemo, useState} from 'react'
import {SubmitStepProps} from '.'
import {Alert, Button, ModalAction, ModalActions, Spacer} from '../..'
import {StepProps} from '../BridgeProcess'
import useTransactionInfo from '../hooks/useTransactionInfo'
import {KhalaProcess} from '../KhalaProcess'
import BaseInfo from './BaseInfo'

type Props = SubmitStepProps & StepProps

const SubmitStepToEthereum: React.FC<Props> = (props) => {
  const {onSubmit, onPrev, onSuccess, layout, data} = props
  const {from, to, amount: amountFromPrevStep} = data || {}
  const {account: accountFrom} = from || {}
  const {account: accountTo} = to || {}
  const {api} = useApiPromise()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const transferSubmit = useTransferSubmit(42)
  const [submittedHash, setSubmittedHash] = useState<Hash>()
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const [progressIndex, setProgressIndex] = useState(-1)
  const {transactionInfo} = useTransactionInfo(data)

  const amount = useMemo(() => {
    if (!amountFromPrevStep || !api || !decimals) return

    return decimalToBalance(new Decimal(amountFromPrevStep), decimals, api)
  }, [amountFromPrevStep, api, decimals])

  const submit = async () => {
    if (!accountTo || !amount || !accountFrom) {
      return
    }

    try {
      setSubmitting(true)

      const accountToAddress = getAddress(accountTo)

      await transferSubmit?.(
        amount,
        accountToAddress,
        accountFrom,
        (status) => {
          console.warn('status.hash', status.hash.toHuman(), status)
          if (status.isReady) {
            setProgressIndex(0)
          } else if (status.isBroadcast) {
            setProgressIndex(1)
          } else if (status.isInBlock) {
            setProgressIndex(2)
          } else if (status.isFinalized) {
            setProgressIndex(3)
            setSubmittedHash(status.hash)
          }
        }
      )
    } catch (e) {
      console.error(e)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <BaseInfo layout={layout} data={transactionInfo} />

      <Spacer></Spacer>

      <Alert>
        {progressIndex >= 0 ? (
          <KhalaProcess progressIndex={progressIndex} />
        ) : (
          'Please be patient as the transaction may take a few minutes. You can follow each step of the transaction here once you confirm it!'
        )}
      </Alert>

      {submittedHash && (
        <ModalActions>
          <ModalAction>
            <Button type="primary" onClick={onPrev}>
              Done
            </Button>
          </ModalAction>
        </ModalActions>
      )}

      {!submittedHash && (
        <ModalActions>
          {onPrev && !isSubmitting && (
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

export default SubmitStepToEthereum
