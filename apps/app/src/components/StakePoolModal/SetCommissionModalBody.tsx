import {TransactionFeeLabel} from '@phala/react-components'
import {useApiPromise} from '@phala/react-libs'
import {Block} from 'baseui/block'
import {FormControl} from 'baseui/form-control'
import {Input} from 'baseui/input'
import {
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from 'baseui/modal'
import {ParagraphSmall} from 'baseui/typography'
import Decimal from 'decimal.js'
import {FC, useMemo, useState} from 'react'
import {StakePool} from '../../hooks/subsquid'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import FormDisplay from '../FormDisplay'

const SetCommissionModalBody: FC<
  {
    stakePool: Pick<StakePool, 'pid'> & Partial<Pick<StakePool, 'commission'>>
  } & Pick<ModalProps, 'onClose'>
> = ({stakePool, onClose}) => {
  const {pid, commission: currentCommission} = stakePool
  const {api} = useApiPromise()
  const [commission, setCommission] = useState('')
  const waitSignAndSend = useWaitSignAndSend()
  const [confirmLock, setConfirmLock] = useState(false)

  const onConfirm = async () => {
    setConfirmLock(true)
    try {
      await waitSignAndSend(extrinsic, (status) => {
        if (status.isReady) {
          onClose?.({closeSource: 'closeButton'})
          setConfirmLock(false)
        }
      })
    } catch (err) {
      // setConfirmLock(false)
    } finally {
      setConfirmLock(false)
    }
  }

  const extrinsic = useMemo(() => {
    if (api && commission) {
      return api.tx.phalaStakePool.setPayoutPref(
        pid,
        new Decimal(commission).times(1e4).toString()
      )
    }
  }, [api, commission, pid])

  if (currentCommission === undefined) return null

  return (
    <>
      <ModalHeader>Set Commission</ModalHeader>
      <ModalBody>
        <FormDisplay label="Pid">
          <ParagraphSmall as="div">{pid}</ParagraphSmall>
        </FormDisplay>
        <FormControl
          label="New Commission"
          caption={
            <span>
              Current Commission:{' '}
              {new Decimal(currentCommission).times(100).toString()}%
            </span>
          }
        >
          {/* FIXME: add amount validation */}
          <Input
            size="compact"
            autoFocus
            type="number"
            endEnhancer="%"
            placeholder="0 - 100"
            min={0}
            max={100}
            onChange={(e) => setCommission(e.currentTarget.value)}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Block
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <TransactionFeeLabel action={extrinsic} />
          <ModalButton
            disabled={!commission || confirmLock}
            onClick={onConfirm}
          >
            Confirm
          </ModalButton>
        </Block>
      </ModalFooter>
    </>
  )
}

export default SetCommissionModalBody
