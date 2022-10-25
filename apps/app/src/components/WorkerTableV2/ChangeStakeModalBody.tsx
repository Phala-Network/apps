import {TransactionFeeLabel} from '@phala/react-components'
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
import {Notification} from 'baseui/notification'
import {ParagraphSmall} from 'baseui/typography'
import Decimal from 'decimal.js'
import {FC, useMemo, useState} from 'react'
import {WorkersConnectionNode} from '.'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import FormDisplay from '../FormDisplay'

const ChangeStakeModalBody: FC<
  {worker: WorkersConnectionNode} & Pick<ModalProps, 'onClose'>
> = ({worker, onClose}) => {
  const {id: workerPublicKey, sMax, miner, stakePool} = worker
  const pid = stakePool?.id
  const {api} = useApiPromise()
  const [amount, setAmount] = useState('')
  const waitSignAndSend = useWaitSignAndSend()
  const isNewAmountNotInRange =
    !amount ||
    (miner && new Decimal(amount).lessThanOrEqualTo(miner.stake)) ||
    (sMax && new Decimal(amount).greaterThan(sMax))

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
      setConfirmLock(false)
    }
  }

  const extrinsic = useMemo(() => {
    if (api && amount && !isNewAmountNotInRange) {
      return api.tx.phalaStakePool.restartMining(
        pid,
        workerPublicKey,
        new Decimal(amount).times(1e12).floor().toString()
      )
    }
  }, [amount, api, pid, workerPublicKey, isNewAmountNotInRange])

  return (
    <>
      <ModalHeader>Change Stake</ModalHeader>
      <ModalBody>
        <ParagraphSmall>Restart the worker with a higher stake</ParagraphSmall>
        <FormDisplay label="Pid">
          <ParagraphSmall as="div">{pid}</ParagraphSmall>
        </FormDisplay>
        <FormDisplay label="Worker Public Key">
          <ParagraphSmall as="div" $style={{wordBreak: 'break-all'}}>
            {workerPublicKey}
          </ParagraphSmall>
        </FormDisplay>
        <FormControl
          label="Amount"
          caption={
            <>
              Current Stake: {miner?.stake && formatCurrency(miner.stake)} PHA
              <br />
              SMax: {sMax && formatCurrency(sMax)} PHA
              <br />
              Pool Free Delegation:{' '}
              {stakePool?.freeStake && formatCurrency(stakePool.freeStake)} PHA
            </>
          }
        >
          {/* FIXME: add amount validation */}
          <Input
            size="compact"
            autoFocus
            type="number"
            min={0}
            onChange={(e) => setAmount(e.currentTarget.value)}
            endEnhancer="PHA"
          />
        </FormControl>
        <Notification
          kind="warning"
          overrides={{
            Body: {style: {width: 'auto', marginLeft: 0, marginRight: 0}},
          }}
        >
          New stake should be larger than the current stake, but not larger than
          SMax. The increase of stake should not be greater than pool free
          delegation.
        </Notification>
      </ModalBody>
      <ModalFooter>
        <Block
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <TransactionFeeLabel action={extrinsic} />
          <ModalButton
            disabled={isNewAmountNotInRange || confirmLock}
            onClick={onConfirm}
          >
            Confirm
          </ModalButton>
        </Block>
      </ModalFooter>
    </>
  )
}

export default ChangeStakeModalBody
