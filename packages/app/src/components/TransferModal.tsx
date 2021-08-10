import React from 'react'
import Button from './Button'
import InputAction from './InputAction'
import InputExternalInfo from './InputExternalInfo'
import InputNumber from './InputNumber'
import Modal from './Modal'
import Spacer from './Spacer'

type Props = {
  visible: boolean
  onClose: () => void
}

const TransferModal: React.FC<Props> = (props) => {
  const { visible, onClose } = props

  return (
    <Modal
      visible={visible}
      actions={[
        <Button onClick={onClose} key='submit' type='primary'>
          Submit
        </Button>,
        <Button onClick={onClose} key='cancel'>
          Cancel
        </Button>,
      ]}
      title='Transfer Modal'>
      <Spacer></Spacer>
      <InputNumber
        size='large'
        placeholder='Address'
        after={<InputAction>MY ADDRESS</InputAction>}></InputNumber>
      <Spacer></Spacer>
      <InputNumber
        size='large'
        placeholder='Amount (PHA)'
        after={<InputAction>MAX</InputAction>}></InputNumber>

      <Spacer y={0.2}></Spacer>

      <InputExternalInfo
        style={{ textAlign: 'right' }}
        {...{
          label: 'Balance',
          value: 1234.56789,
          type: 'PHA',
        }}
      />
    </Modal>
  )
}

export default TransferModal
