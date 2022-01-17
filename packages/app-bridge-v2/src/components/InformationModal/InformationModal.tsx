import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ROLE,
  SIZE,
} from 'baseui/modal'
import {FC} from 'react'
import {useAllTransferData} from '../../store'
import {modalOverrides} from '../../style/modalOverrides'
import {Button} from '../Button'
import {InformationDetailItem} from '../InformationDetailItem'
import {EthereumProgress} from '../TransferModal/transferAction/TransferPHAFromEthereumToKhala/EthereumProgress'
import {InformationDetailArea} from './styledComponents'

interface InformationModalProps {
  type?: string
  isOpen?: boolean
  onClose?: () => void
}

export const InformationModal: FC<InformationModalProps> = (props) => {
  const {isOpen, onClose} = props
  const allTransferData = useAllTransferData()

  return (
    <Modal
      onClose={onClose}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
      overrides={modalOverrides}
    >
      <ModalHeader>Bridge Confirmation</ModalHeader>

      <ModalBody>
        <InformationDetailArea>
          <InformationDetailItem
            label="From"
            isShowNetworkIcon={false}
            address={allTransferData.fromAddress}
            network={allTransferData.fromNetwork}
            coin={allTransferData.fromCoin}
            amount={allTransferData.amountDecimal.toString()}
          />
          <InformationDetailItem
            label="To"
            isShowNetworkIcon={false}
            address={allTransferData.toAddress}
            network={allTransferData.toNetwork}
            coin={allTransferData.toCoin}
            amount={allTransferData.amountDecimal.toString()}
          />
        </InformationDetailArea>
        <EthereumProgress transactionHash={'9898sss'} />
      </ModalBody>

      <ModalFooter>
        <Button onClick={onClose}>Collapse</Button>
      </ModalFooter>
    </Modal>
  )
}
