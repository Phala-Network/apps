import {Button} from 'baseui/button'
import {Modal, ModalBody} from 'baseui/modal'

const Body = (): JSX.Element => {
  return (
    <>
      <ModalBody></ModalBody>
    </>
  )
}

const CreatePoolButton = (): JSX.Element => {
  return (
    <>
      <Button kind="secondary">Create Pool</Button>
      <Modal>
        <Body />
      </Modal>
    </>
  )
}

export default CreatePoolButton
