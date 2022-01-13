import {KIND as ButtonKind} from 'baseui/button'
import {
  Modal,
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
  ROLE,
  SIZE,
} from 'baseui/modal'
import {FC} from 'react'
import {Ethereum, Khala, PHA} from '../../config'
import {useAllTransferData} from '../../store'
import {modalOverrides} from '../../style/modalOverrides'
import {TransactionInfo} from '../../types'
import {TransferPHAFromEthereumToKhala} from './transferAction/TransferPHAFromEthereumToKhala'
import {TransferPHAFromKhalaToEthereum} from './transferAction/TransferPHAFromKhalaToEthereum'

interface TransferModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
  transactionInfo?: TransactionInfo
}

function useCheckTransferType() {
  const {fromCoin, fromNetwork, toNetwork} = useAllTransferData()

  return function (
    checkFromCoin: string,
    checkFromNetwork: string,
    checkToNetwork: string
  ) {
    return (
      fromCoin === checkFromCoin &&
      fromNetwork === checkFromNetwork &&
      toNetwork === checkToNetwork
    )
  }
}

export const TransferModal: FC<TransferModalProps> = (props) => {
  const {isOpen, onClose} = props

  const is = useCheckTransferType()

  return (
    <Modal
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
      overrides={modalOverrides}
    >
      <ModalHeader>Bridge Confirmation</ModalHeader>

      <ModalBody>
        {is(PHA, Khala, Ethereum) && TransferPHAFromKhalaToEthereum}
        {is(PHA, Ethereum, Khala) && TransferPHAFromEthereumToKhala}
      </ModalBody>

      <ModalFooter>
        <ModalButton onClick={onClose} kind={ButtonKind.tertiary}>
          Cancel
        </ModalButton>
        <ModalButton>Submit</ModalButton>
      </ModalFooter>
    </Modal>
  )
}
