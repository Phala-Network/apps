import {TransactionFeeLabel} from '@phala/react-components'
import {useApiPromise} from '@phala/react-libs'
import {formatCurrency} from '@phala/utils'
import {Block} from 'baseui/block'
import {
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from 'baseui/modal'
import {ParagraphSmall} from 'baseui/typography'
import {FC, useMemo, useState} from 'react'
import {WorkersConnectionNode} from '.'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import FormDisplay from '../FormDisplay'

const ReclaimModalBody: FC<
  {worker: WorkersConnectionNode} & Pick<ModalProps, 'onClose'>
> = ({worker, onClose}) => {
  const {stakePool, id: workerPublicKey, miner} = worker
  const pid = stakePool?.id
  const {api} = useApiPromise()
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
    if (api) {
      return api.tx.phalaStakePool.reclaimPoolWorker(pid, workerPublicKey)
    }
  }, [api, pid, workerPublicKey])

  return (
    <>
      <ModalHeader>Reclaim Worker</ModalHeader>
      <ModalBody>
        <ParagraphSmall>
          Reclaims the releasing stake of miners in a pool
        </ParagraphSmall>
        <FormDisplay label="Pid">
          <ParagraphSmall as="div">{pid}</ParagraphSmall>
        </FormDisplay>
        <FormDisplay label="Worker Public Key">
          <ParagraphSmall as="div" $style={{wordBreak: 'break-all'}}>
            {workerPublicKey}
          </ParagraphSmall>
        </FormDisplay>
        <FormDisplay label="Reclaimable Stake">
          <ParagraphSmall as="div">
            {miner?.stake && formatCurrency(miner.stake)} PHA
          </ParagraphSmall>
        </FormDisplay>
      </ModalBody>
      <ModalFooter>
        <Block
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <TransactionFeeLabel action={extrinsic} />
          <ModalButton disabled={confirmLock} onClick={onConfirm}>
            Confirm
          </ModalButton>
        </Block>
      </ModalFooter>
    </>
  )
}

export default ReclaimModalBody
