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
import {useDelegableBalance} from '../../hooks/useDelegableBalance'
import Decimal from 'decimal.js'
import {formatCurrency} from '@phala/utils'
import ValueSkeleton from '../ValueSkeleton'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'

const DelegateModalBody = ({
  stakePool,
  onClose,
}: {stakePool: StakePools} & Pick<ModalProps, 'onClose'>): JSX.Element => {
  const {pid, remainingStake} = stakePool
  const {api} = useApiPromise()
  const delegableBalance = useDelegableBalance()
  const [amount, setAmount] = useState('')
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const onConfirm = () => {
    if (api && decimals) {
      waitSignAndSend(
        api.tx.phalaStakePool?.contribute?.(
          pid,
          new Decimal(amount).times(decimals).floor().toString()
        ),
        (status) => {
          if (status.isReady) {
            onClose?.({closeSource: 'closeButton'})
          }
        }
      )
    }
  }

  const remaining = remainingStake
    ? // FIXME: use common format
      `${formatCurrency(remainingStake)} PHA`
    : '∞'

  return (
    <>
      <ModalHeader>Delegate</ModalHeader>
      <ModalBody>
        <FormControl label="Pid">
          <ParagraphLarge as="div">{pid}</ParagraphLarge>
        </FormControl>
        <FormControl
          label="Amount"
          caption={
            <>
              Pool Remaining: {remaining}
              <br />
              Delegable Balance:{' '}
              {delegableBalance && decimals ? (
                `${formatCurrency(delegableBalance.div(decimals))} PHA`
              ) : (
                <ValueSkeleton />
              )}
            </>
          }
        >
          {/* FIXME: add amount validation */}
          <Input
            autoFocus
            type="number"
            placeholder="Amount (PHA)"
            min={0}
            onChange={(e) => setAmount(e.currentTarget.value)}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton
          kind="tertiary"
          onClick={() => onClose?.({closeSource: 'closeButton'})}
        >
          Cancel
        </ModalButton>
        <ModalButton disabled={!amount} onClick={onConfirm}>
          Confirm
        </ModalButton>
      </ModalFooter>
    </>
  )
}

export default DelegateModalBody
