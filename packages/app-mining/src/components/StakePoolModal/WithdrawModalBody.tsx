import {PhalaStakePoolTransactionFeeLabel} from '@phala/react-components'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import {useCurrentAccount} from '@phala/store'
import {formatCurrency} from '@phala/utils'
import {Block} from 'baseui/block'
import {Button} from 'baseui/button'
import {FormControl} from 'baseui/form-control'
import {Input} from 'baseui/input'
import {
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from 'baseui/modal'
import {Notification} from 'baseui/notification'
import {ParagraphSmall} from 'baseui/typography'
import Decimal from 'decimal.js'
import {FC, useMemo, useState} from 'react'
import {StakePool} from '.'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'

const WithdrawModalBody: FC<
  {
    stakePool: Pick<StakePool, 'pid'> &
      Partial<Pick<StakePool, 'stakePoolStakers' | 'stakePoolWithdrawals'>>
  } & Pick<ModalProps, 'onClose'>
> = ({stakePool, onClose}) => {
  const {pid, stakePoolStakers, stakePoolWithdrawals} = stakePool
  const {api} = useApiPromise()
  const [amount, setAmount] = useState('')
  const [polkadotAccount] = useCurrentAccount()
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
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
  const hasWithdrawing = useMemo<boolean>(
    () =>
      Boolean(
        stakePoolWithdrawals?.find(
          (withdrawal) => withdrawal.userAddress === polkadotAccount?.address
        )
      ),
    [stakePoolWithdrawals, polkadotAccount]
  )

  const extrinsic = useMemo(() => {
    if (api && amount && decimals && stakePoolStakers?.[0]) {
      return api.tx.phalaStakePool?.withdraw?.(
        pid,
        new Decimal(amount)
          .div(new Decimal(stakePoolStakers[0].stake))
          .times(new Decimal(stakePoolStakers[0].shares))
          .times(decimals)
          .floor()
          .toString()
      )
    }
  }, [api, stakePoolStakers, decimals, amount, pid])

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
                kind="tertiary"
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
        <Block
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <PhalaStakePoolTransactionFeeLabel action={extrinsic} />
          <ModalButton disabled={!amount || confirmLock} onClick={onConfirm}>
            Confirm
          </ModalButton>
        </Block>
      </ModalFooter>
    </>
  )
}

export default WithdrawModalBody
