import {TransactionFeeLabel} from '@phala/react-components'
import {useApiPromise} from '@phala/react-libs'
import {useCurrentAccount} from '@phala/store'
import {Block} from 'baseui/block'
import {Button} from 'baseui/button'
import {
  Modal,
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from 'baseui/modal'
import {ParagraphSmall} from 'baseui/typography'
import {useMemo, useState} from 'react'
import useWaitSignAndSend from '../hooks/useWaitSignAndSend'

const Body = ({onClose}: Pick<ModalProps, 'onClose'>) => {
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
      return api.tx.phalaStakePool.create()
    }
  }, [api])

  return (
    <>
      <ModalHeader>Create Pool</ModalHeader>
      <ModalBody>
        <ParagraphSmall>You will create a new stake pool.</ParagraphSmall>
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

const CreatePoolButton = () => {
  const [currentAccount] = useCurrentAccount()
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  return (
    <>
      <Button
        kind="secondary"
        onClick={() => {
          setIsOpen(true)
        }}
        disabled={!currentAccount}
      >
        Create Pool
      </Button>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        overrides={{
          Dialog: {
            style: ({$theme}) => ({
              borderRadius: '4px',
              borderWidth: '2px',
              borderColor: $theme.colors.accent,
              borderStyle: 'solid',
            }),
          },
        }}
      >
        <Body onClose={onClose} />
      </Modal>
    </>
  )
}

export default CreatePoolButton
