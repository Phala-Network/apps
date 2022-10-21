import {PhalaStakePoolTransactionFeeLabel} from '@phala/react-components'
import {useApiPromise} from '@phala/react-libs'
import {Block} from 'baseui/block'
import {FormControl} from 'baseui/form-control'
import {
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from 'baseui/modal'
import {ParagraphSmall} from 'baseui/typography'
import {FC, useMemo, useState} from 'react'
import {WorkerConnectionNode} from '.'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'

const StopModalBody: FC<
  {worker: WorkerConnectionNode} & Pick<ModalProps, 'onClose'>
> = ({worker, onClose}) => {
  const {stakePool, id: workerPublicKey} = worker
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
    } catch (err) {
      // setConfirmLock(false)
    } finally {
      setConfirmLock(false)
    }
  }

  const extrinsic = useMemo(() => {
    if (api) {
      return api.tx.phalaStakePool?.stopMining?.(pid, workerPublicKey)
    }
  }, [api, pid, workerPublicKey])

  return (
    <>
      <ModalHeader>Stop Mining</ModalHeader>
      <ModalBody>
        <ParagraphSmall>
          Stop a miner on behalf of the stake pool
        </ParagraphSmall>
        <FormControl label="Pid">
          <ParagraphSmall as="div">{pid}</ParagraphSmall>
        </FormControl>
        <FormControl label="Worker Public Key">
          <ParagraphSmall as="div" $style={{wordBreak: 'break-all'}}>
            {workerPublicKey}
          </ParagraphSmall>
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Block
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <PhalaStakePoolTransactionFeeLabel action={extrinsic} />
          <ModalButton disabled={confirmLock} onClick={onConfirm}>
            Confirm
          </ModalButton>
        </Block>
      </ModalFooter>
    </>
  )
}

export default StopModalBody
