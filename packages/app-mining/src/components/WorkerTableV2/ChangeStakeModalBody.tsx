import {useState} from 'react'
import {Input} from 'baseui/input'
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  ModalProps,
} from 'baseui/modal'
import {ParagraphSmall} from 'baseui/typography'
import {FormControl} from 'baseui/form-control'
import type {Miners} from '../../hooks/graphql'
import Decimal from 'decimal.js'
import {formatCurrency} from '@phala/utils'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import {toaster} from 'baseui/toast'
import {Notification} from 'baseui/notification'

const ChangeStakeModalBody = ({
  miner,
  onClose,
}: {miner: Miners} & Pick<ModalProps, 'onClose'>): JSX.Element => {
  const {
    pid,
    workerPublicKey,
    sMax,
    stakes,
    stakePools: {freeStake},
  } = miner
  const {api} = useApiPromise()
  const [amount, setAmount] = useState('')
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const onConfirm = () => {
    if (
      new Decimal(amount).lessThanOrEqualTo(stakes) ||
      new Decimal(amount).greaterThan(sMax)
    ) {
      toaster.negative(
        'New stake should be larger than the current stake, but not larger than Smax. The increase of stake should not be greater than pool free delegation.',
        {}
      )
      return
    }

    if (api && decimals) {
      waitSignAndSend(
        api.tx.phalaStakePool?.restartMining?.(
          pid,
          workerPublicKey,
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

  return (
    <>
      <ModalHeader>Change Stake</ModalHeader>
      <ModalBody>
        <ParagraphSmall>Restart the worker with a higher stake</ParagraphSmall>
        <FormControl label="Pid">
          <ParagraphSmall as="div">{pid}</ParagraphSmall>
        </FormControl>
        <FormControl label="Worker Public Key">
          <ParagraphSmall as="div" $style={{wordBreak: 'break-all'}}>
            {workerPublicKey}
          </ParagraphSmall>
        </FormControl>
        <FormControl
          label="Amount"
          caption={
            <>
              Current Stake: {formatCurrency(stakes)} PHA
              <br />
              Smax: {formatCurrency(sMax)} PHA
              <br />
              Pool Free Delegation: {formatCurrency(freeStake)} PHA
            </>
          }
        >
          {/* FIXME: add amount validation */}
          <Input
            size="compact"
            autoFocus
            type="number"
            placeholder="Amount (PHA)"
            min={0}
            onChange={(e) => setAmount(e.currentTarget.value)}
          />
        </FormControl>
        <Notification
          kind="warning"
          overrides={{Body: {style: {width: 'auto'}}}}
        >
          New stake should be larger than the current stake, but not larger than
          Smax. The increase of stake should not be greater than pool free
          delegation.
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

export default ChangeStakeModalBody
