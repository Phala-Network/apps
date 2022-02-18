import {useMemo, useState, VFC} from 'react'
import {Input} from 'baseui/input'
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  ModalProps,
} from 'baseui/modal'
import {Notification} from 'baseui/notification'
import {ParagraphSmall} from 'baseui/typography'
import {FormControl} from 'baseui/form-control'
import Decimal from 'decimal.js'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import {Button} from 'baseui/button'
import {formatCurrency} from '@phala/utils'
import {usePolkadotAccountAtom} from '@phala/app-store'
import {StakePool} from '.'

const WithdrawModalBody: VFC<
  {
    stakePool: Pick<StakePool, 'pid'> &
      Partial<Pick<StakePool, 'stakePoolStakers' | 'stakePoolWithdrawals'>>
  } & Pick<ModalProps, 'onClose'>
> = ({stakePool, onClose}) => {
  const {pid, stakePoolStakers, stakePoolWithdrawals} = stakePool
  const {api} = useApiPromise()
  const [amount, setAmount] = useState('')
  const [polkadotAccount] = usePolkadotAccountAtom()
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const onConfirm = () => {
    if (api && decimals && stakePoolStakers?.[0]) {
      waitSignAndSend(
        api.tx.phalaStakePool?.withdraw?.(
          pid,
          new Decimal(amount)
            .div(new Decimal(stakePoolStakers[0].stake))
            .times(new Decimal(stakePoolStakers[0].shares))
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
        stakePoolWithdrawals?.find(
          (withdrawal) => withdrawal.userAddress === polkadotAccount?.address
        )
      ),
    [stakePoolWithdrawals, polkadotAccount]
  )

  if (stakePoolStakers === undefined || stakePoolWithdrawals === undefined)
    return null

  return (
    <>
      <ModalHeader>Withdraw</ModalHeader>
      <ModalBody>
        <FormControl label="Pid">
          <ParagraphSmall as="div">{pid}</ParagraphSmall>
        </FormControl>
        <FormControl
          label="Amount"
          caption={`Your Delegation: ${formatCurrency(
            stakePoolStakers[0]?.stake as string
          )} PHA`}
        >
          {/* FIXME: add amount validation */}
          <Input
            size="compact"
            autoFocus
            value={amount}
            type="number"
            placeholder="Amount (PHA)"
            endEnhancer={
              <Button
                size="mini"
                kind="minimal"
                onClick={() => {
                  if (stakePoolStakers[0]) {
                    setAmount(stakePoolStakers[0].stake)
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
