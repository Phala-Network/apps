import {TransactionFeeLabel} from '@phala/react-components'
import {useApiPromise} from '@phala/react-libs'
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
import {StakePool} from '../../hooks/subsquid'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import FormDisplay from '../FormDisplay'

const WithdrawModalBody: FC<
  {
    stakePool: Pick<StakePool, 'pid'> & Partial<Pick<StakePool, 'stakes'>>
  } & Pick<ModalProps, 'onClose'>
> = ({stakePool, onClose}) => {
  const {pid, stakes} = stakePool
  const {api} = useApiPromise()
  const [amount, setAmount] = useState('')
  const [polkadotAccount] = useCurrentAccount()
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
  const hasWithdrawing = useMemo<boolean>(
    () =>
      Boolean(
        stakes?.find(
          (stakes) =>
            stakes.account.id === polkadotAccount?.address &&
            stakes.withdrawalAmount !== '0'
        )
      ),
    [stakes, polkadotAccount]
  )

  const extrinsic = useMemo(() => {
    if (api && amount && stakes?.[0]) {
      return api.tx.phalaStakePool?.withdraw?.(
        pid,
        new Decimal(amount)
          .div(new Decimal(stakes[0].amount))
          .times(new Decimal(stakes[0].shares))
          .times(1e12)
          .floor()
          .toString()
      )
    }
  }, [api, stakes, amount, pid])

  if (stakes === undefined) return null

  return (
    <>
      <ModalHeader>Withdraw</ModalHeader>
      <ModalBody>
        <FormDisplay label="Pid">
          <ParagraphSmall as="div">{pid}</ParagraphSmall>
        </FormDisplay>
        <FormControl
          label="Amount"
          caption={`Your Delegation: ${formatCurrency(
            stakes[0]?.amount as string
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
                  if (stakes[0]?.amount) {
                    setAmount(stakes[0].amount)
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
          <TransactionFeeLabel action={extrinsic} />
          <ModalButton disabled={!amount || confirmLock} onClick={onConfirm}>
            Confirm
          </ModalButton>
        </Block>
      </ModalFooter>
    </>
  )
}

export default WithdrawModalBody
