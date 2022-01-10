import {useState} from 'react'
import {Input} from 'baseui/input'
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  ModalProps,
} from 'baseui/modal'
import {ParagraphLarge} from 'baseui/typography'
import {FormControl} from 'baseui/form-control'
import type {StakePools} from '../../hooks/graphql'
import Decimal from 'decimal.js'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'

const SetCommissionModalBody = ({
  stakePool,
  onClose,
}: {stakePool: StakePools} & Pick<ModalProps, 'onClose'>): JSX.Element => {
  const {pid, commission: currentCommission} = stakePool
  const {api} = useApiPromise()
  const [commission, setCommission] = useState('')
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const onConfirm = () => {
    if (api && decimals) {
      waitSignAndSend(
        api.tx.phalaStakePool?.setPayoutPref?.(
          stakePool.pid,
          new Decimal(commission).times(10 ** 4).toString()
        ),
        (status) => {
          if (status.isReady) {
            onClose?.({closeSource: 'closeButton'})
          }
        }
      )
    }
  }

  return (
    <>
      <ModalHeader>Set Commission</ModalHeader>
      <ModalBody>
        <FormControl label="Pid">
          <ParagraphLarge as="div">{pid}</ParagraphLarge>
        </FormControl>
        <FormControl label="Current Commission">
          <ParagraphLarge as="div">
            {new Decimal(currentCommission).times(100).toString()}%
          </ParagraphLarge>
        </FormControl>
        <FormControl label="New Commission">
          {/* FIXME: add amount validation */}
          <Input
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
        <ModalButton disabled={!commission} onClick={onConfirm}>
          Confirm
        </ModalButton>
      </ModalFooter>
    </>
  )
}

export default SetCommissionModalBody
