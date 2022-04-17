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
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import {useApiPromise} from '@phala/react-libs'
import {PhalaStakePoolTransactionFeeLabel} from '@phala/react-components'
import {useMemo} from 'react'
import {Block} from 'baseui/block'

const StopModalBody = ({
  miner,
  onClose,
}: {miner: Miners} & Pick<ModalProps, 'onClose'>): JSX.Element => {
  const {pid, workerPublicKey} = miner
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()
  const onConfirm = () => {
    waitSignAndSend(extrinsic, (status) => {
      if (status.isReady) {
        onClose?.({closeSource: 'closeButton'})
      }
    })
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
          <ModalButton onClick={onConfirm}>Confirm</ModalButton>
        </Block>
      </ModalFooter>
    </>
  )
}

export default StopModalBody
