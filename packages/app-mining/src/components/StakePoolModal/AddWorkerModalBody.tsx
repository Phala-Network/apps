import {useMemo, useState, FC} from 'react'
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
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import {StakePool} from '.'
import {PhalaStakePoolTransactionFeeLabel} from '@phala/react-components'
import {Block} from 'baseui/block'

const AddWorkerModalBody: FC<
  {stakePool: Pick<StakePool, 'pid'>} & Pick<ModalProps, 'onClose'>
> = ({stakePool, onClose}) => {
  const {pid} = stakePool
  const {api} = useApiPromise()
  const [pubKey, setPubKey] = useState('')
  const [error, setError] = useState<string | null>(null)
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  // Expected at least 32 bytes (256 bits), so it should be 31 * 2 + 1 === 63
  const isValidPubKey = /0x[0-9a-fA-F]{63,}/.test(pubKey)
  const onConfirm = () => {
    waitSignAndSend(extrinsic, (status) => {
      if (status.isReady) {
        onClose?.({closeSource: 'closeButton'})
      }
    })
  }

  const extrinsic = useMemo(() => {
    if (api && decimals && isValidPubKey) {
      return api?.tx.phalaStakePool?.addWorker?.(pid, pubKey)
    }
  }, [api, decimals, pid, isValidPubKey, pubKey])

  return (
    <>
      <ModalHeader>Add Worker</ModalHeader>
      <ModalBody>
        <FormControl label="Pid">
          <ParagraphSmall as="div">{pid}</ParagraphSmall>
        </FormControl>
        <FormControl label="Worker Public Key" error={error}>
          <Input
            size="compact"
            autoFocus
            placeholder="0x"
            onChange={(e) => {
              const value = e.currentTarget.value
              if (!value.startsWith('0x')) {
                setError('Should start with 0x')
              } else {
                setError(null)
              }
              setPubKey(value)
            }}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Block
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <PhalaStakePoolTransactionFeeLabel action={extrinsic} />
          <ModalButton
            disabled={!isValidPubKey || Boolean(error)}
            onClick={onConfirm}
          >
            Confirm
          </ModalButton>
        </Block>
      </ModalFooter>
    </>
  )
}

export default AddWorkerModalBody
