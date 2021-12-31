import {useMemo, useState} from 'react'
import {Input} from 'baseui/input'
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  ModalProps,
} from 'baseui/modal'
import {Notification} from 'baseui/notification'
import {ParagraphLarge} from 'baseui/typography'
import {FormControl} from 'baseui/form-control'
import type {StakePools} from '../../hooks/graphql'
import Decimal from 'decimal.js'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import {Button} from 'baseui/button'
import {formatCurrency} from '@phala/utils'
import {usePolkadotAccountAtom} from '@phala/app-store'

const WithdrawModalBody = ({
  stakePool,
  onClose,
}: {stakePool: StakePools} & Pick<ModalProps, 'onClose'>): JSX.Element => {
  const {pid} = stakePool
  const {api} = useApiPromise()
  const [amount, setAmount] = useState('')
  const [polkadotAccount] = usePolkadotAccountAtom()
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const onConfirm = () => {
    if (api && decimals && stakePool.stakePoolStakers[0]) {
      waitSignAndSend(
        api.tx.phalaStakePool?.withdraw?.(
          pid,
          new Decimal(amount)
            .div(new Decimal(stakePool.stakePoolStakers[0].stake))
            .times(new Decimal(stakePool.stakePoolStakers[0].shares))
            .times(decimals)
            .floor()
            .toString()
        ),
        (status) => {
          if (status.isReady) {
            onClose?.({closeSource: 'closeButton'})
          }
        }
      )
    }
  }
  const hasWithdrawing = useMemo<boolean>(
    () =>
      Boolean(
        stakePool.stakePoolWithdrawals.find(
          (withdrawal) => withdrawal.userAddress === polkadotAccount?.address
        )
      ),
    [stakePool, polkadotAccount]
  )

  return (
    <>
      <ModalHeader>Withdraw</ModalHeader>
      <ModalBody>
        <FormControl label="Pid">
          <ParagraphLarge as="div">{pid}</ParagraphLarge>
        </FormControl>
        <FormControl
          label="Amount"
          caption={`Your Delegation: ${formatCurrency(
            stakePool.stakePoolStakers[0]?.stake as string
          )} PHA`}
        >
          {/* FIXME: add amount validation */}
          <Input
            autoFocus
            value={amount}
            type="number"
            placeholder="Amount (PHA)"
            endEnhancer={
              <Button
                size="mini"
                kind="minimal"
                onClick={() => {
                  if (stakePool.stakePoolStakers[0]) {
                    setAmount(stakePool.stakePoolStakers[0].stake)
                  }
                }}
              >
                Max
              </Button>
            }
            min={0}
            onChange={(e) => setAmount(e.currentTarget.value)}
          />
        </FormControl>
        {hasWithdrawing && (
          <Notification
            kind="warning"
            overrides={{
              Body: {style: {width: 'auto', whiteSpace: 'pre-wrap'}},
            }}
          >
            {hasWithdrawing && 'You have a pending withdraw request!\n\n'}
            Only one withdraw request is kept. Resubmission will replace the
            existing one and reset the countdown.
          </Notification>
        )}
      </ModalBody>
      <ModalFooter>
        <ModalButton disabled={!amount} onClick={onConfirm}>
          Confirm
        </ModalButton>
      </ModalFooter>
    </>
  )
}

export default WithdrawModalBody
