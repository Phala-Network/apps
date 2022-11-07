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
import {WorkersConnectionNode} from '.'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import FormDisplay from '../FormDisplay'
import {TransactionFeeLabel} from '../TransactionFeeLabel'

const StartModalBody: FC<
  {worker: WorkersConnectionNode} & Pick<ModalProps, 'onClose'>
> = ({worker, onClose}) => {
  const {id: workerPublicKey, sMin, sMax, stakePool} = worker
  const pid = stakePool?.id
  const {api} = useApiPromise()
  const [amount, setAmount] = useState('')
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
    } finally {
      setConfirmLock(false)
    }
  }
  const extrinsic = useMemo(() => {
    if (api && amount) {
      return api.tx.phalaStakePool.startMining(
        pid,
        workerPublicKey,
        new Decimal(amount).times(1e12).floor().toString()
      )
    }
  }, [amount, api, pid, workerPublicKey])

  return (
    <>
      <ModalHeader>Start Mining</ModalHeader>
      <ModalBody>
        <ParagraphSmall>
          Start a miner on behalf of the stake pool
        </ParagraphSmall>
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
              SMin: {sMin && formatCurrency(sMin)} PHA
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

export default StartModalBody
