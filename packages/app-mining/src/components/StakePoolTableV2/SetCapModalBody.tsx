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
import {formatCurrency} from '@phala/utils'

const SetCapModalBody = ({
  stakePool,
  onClose,
}: {stakePool: StakePools} & Pick<ModalProps, 'onClose'>): JSX.Element => {
  const {pid, cap: currentCap, totalStake} = stakePool
  const {api} = useApiPromise()
  const [cap, setCap] = useState('')
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const onConfirm = () => {
    if (api && decimals) {
      waitSignAndSend(
        api.tx.phalaStakePool?.setCap?.(
          pid,
          new Decimal(cap).times(decimals).floor().toString()
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
      <ModalHeader>Set Cap</ModalHeader>
      <ModalBody>
        <FormControl label="Pid">
          <ParagraphLarge as="div">{pid}</ParagraphLarge>
        </FormControl>
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
            autoFocus
            type="number"
            endEnhancer="PHA"
            min={0}
            onChange={(e) => setCap(e.currentTarget.value)}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton disabled={!cap} onClick={onConfirm}>
          Confirm
        </ModalButton>
      </ModalFooter>
    </>
  )
}

export default SetCapModalBody
