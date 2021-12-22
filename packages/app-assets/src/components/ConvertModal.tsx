import {
  Button,
  InputAction,
  InputExternalInfo,
  InputNumber,
  Modal,
  Spacer,
} from '@phala/react-components'
import React from 'react'

type Props = {
  visible: boolean
  onClose: () => void
}

const ConvertModal: React.FC<Props> = (props) => {
  const {visible, onClose} = props

  return (
    <Modal
      visible={visible}
      actions={[
        <Button onClick={onClose} key="submit" type="primary">
          Submit
        </Button>,
        <Button onClick={onClose} key="cancel">
          Cancel
        </Button>,
      ]}
      title="Convert to pPHA"
    >
      <InputNumber
        size="large"
        placeholder="Amount (PHA)"
        after={<InputAction>MAX</InputAction>}
      ></InputNumber>

      <Spacer y={0.2}></Spacer>

      <InputExternalInfo
        style={{textAlign: 'right'}}
        {...{
          label: 'Balance',
          value: 1234.56789,
          type: 'PHA',
        }}
      />
    </Modal>
  )
}

export default ConvertModal
