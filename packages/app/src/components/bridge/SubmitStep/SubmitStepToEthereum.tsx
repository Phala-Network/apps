import { ExtrinsicStatus, Hash } from '@polkadot/types/interfaces'
import { Decimal } from 'decimal.js'
import { getAddress } from 'ethers/lib/utils'
import { useAtom } from 'jotai'
import React, { useEffect, useMemo, useState } from 'react'
import { SubmitStepProps } from '.'
import transactionsInfoAtom from '../../../atoms/transactionsInfoAtom'
import { useTransferSubmit } from '../../../libs/polkadot/extrinsics/bridgeTransfer'
import { useApiPromise } from '../../../libs/polkadot/hooks/useApiPromise'
import { useDecimalJsTokenDecimalMultiplier } from '../../../libs/polkadot/useTokenDecimals'
import { decimalToBalance } from '../../../libs/polkadot/utils/balances'
import Alert from '../../Alert/Alert'
import Button from '../../Button'
import { ModalAction, ModalActions } from '../../Modal'
import Spacer from '../../Spacer'
import { StepProps } from '../BridgeProcess'
import useTransactionInfo from '../hooks/useTransactionInfo'
import BaseInfo from './BaseInfo'
import Progress from './Progress'

type Props = SubmitStepProps & StepProps

const SubmitStepToEthereum: React.FC<Props> = (props) => {
  const { onSubmit, onPrev, onSuccess, layout, data } = props
  const { from, to, amount: amountFromPrevStep } = data || {}
  const { account: accountFrom } = from || {}
  const { account: accountTo } = to || {}
  const [transactionsInfo, setTransactionsInfo] = useAtom(transactionsInfoAtom)
  const { api } = useApiPromise()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const transferSubmit = useTransferSubmit(42)
  const [submittedHash, setSubmittedHash] = useState<Hash>()
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const [extrinsicStatus, setExtrinsicStatus] = useState<ExtrinsicStatus[]>([])
  const [progressIndex, setProgressIndex] = useState(-1)
  const { transactionInfo } = useTransactionInfo(data)
  const [progress, setProgress] = useState<{ status: string; text: string }[]>(
    []
  )

  useEffect(() => {
    const p = [
      {
        text: 'Transaction Send',
        status: 'success',
      },
      {
        text: 'Ethereum Confirmed',
        status: 'success',
      },
      {
        text: 'Relayer Confirmed',
        status: 'none',
      },
      {
        text: 'Khala Confirmed',
        status: 'none',
      },
    ].map((item, index) => {
      return {
        ...item,
        status: index <= progressIndex ? 'success' : 'none',
      }
    })

    setProgress(p)
  }, [progressIndex])

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

      const hash = await transferSubmit?.(
        amount,
        accountToAddress,
        accountFrom,
        (status) => {
          if (status.isReady) {
            setProgressIndex(0)
          } else if (status.isBroadcast) {
            setProgressIndex(1)
          } else if (status.isInBlock) {
            setProgressIndex(2)
          } else if (status.isFinalized) {
            setProgressIndex(3)
          }

          setExtrinsicStatus([...extrinsicStatus, status])
        }
      )

      setSubmittedHash(hash)

      const newTransactionInfo = {
        ...transactionInfo,
        hash: hash?.toString(),
      }

      setTransactionsInfo([newTransactionInfo, ...transactionsInfo])

      onSuccess?.(newTransactionInfo)
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
        {progressIndex === -1 &&
          'Please be patient as the transaction may take a few minutes. You can follow each step of the transaction here once you confirm it!'}

        {progressIndex >= 0 && <Progress data={progress}></Progress>}
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
