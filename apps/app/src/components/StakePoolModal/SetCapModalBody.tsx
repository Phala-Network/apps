import {useApiPromise} from '@phala/react-libs'
import {formatCurrency} from '@phala/utils'
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
import {TransactionFeeLabel} from '../TransactionFeeLabel'

const SetCapModalBody: FC<
  {
    stakePool: Pick<StakePool, 'pid'> &
      Partial<Pick<StakePool, 'capacity' | 'totalStake'>>
  } & Pick<ModalProps, 'onClose'>
> = ({stakePool, onClose}) => {
  const {pid, capacity: currentCap, totalStake} = stakePool
  const {api} = useApiPromise()
  const [cap, setCap] = useState('')
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
    if (api && cap) {
      return api.tx.phalaStakePool.setCap(
        pid,
        new Decimal(cap).times(1e12).floor().toString()
      )
    }
  }, [api, cap, pid])

  if (totalStake === undefined || currentCap === undefined) return null

  return (
    <>
      <ModalHeader>Set Cap</ModalHeader>
      <ModalBody>
        <FormDisplay label="Pid">
          <ParagraphSmall as="div">{pid}</ParagraphSmall>
        </FormDisplay>
        <FormControl
          label="New Cap"
          caption={
            <>
              Current Cap:{' '}
              {currentCap ? `${formatCurrency(currentCap)} PHA` : '∞'}
              <br />
              Delegated: {formatCurrency(totalStake)} PHA
            </>
          }
        >
          {/* FIXME: add cap validation */}
          <Input
            size="compact"
            autoFocus
            type="number"
            endEnhancer="PHA"
            min={0}
            onChange={(e) => setCap(e.currentTarget.value)}
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
          <ModalButton disabled={!cap || confirmLock} onClick={onConfirm}>
            Confirm
          </ModalButton>
        </Block>
      </ModalFooter>
    </>
  )
}

export default SetCapModalBody
