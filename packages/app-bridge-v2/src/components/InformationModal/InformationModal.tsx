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
import {buttonOverrides} from '../../style/buttonOverrides'
import {modalOverrides} from '../../style/modalOverrides'
import {Button} from '../Button'
import {
  InformationDetailItem,
  TransferPanelProps,
} from '../InformationDetailItem'
import {EthereumProgress} from '../TransferModal/transferAction/TransferPHAFromEthereumToKhala/EthereumProgress'
import {InformationDetailArea} from './styledComponents'

interface InformationModalProps {
  type?: string
  isOpen?: boolean
  onClose?: () => void
  transferData?: {
    from?: TransferPanelProps
    to?: TransferPanelProps
  }
}

export const InformationModal: FC<InformationModalProps> = (props) => {
  const {isOpen, onClose, transferData} = props
  const allTransferData = useAllTransferData()

  let {from, to} = transferData || {from: undefined, to: undefined}

  if (!from || !to) {
    from = {
      label: 'From',
      address: allTransferData.fromAddress,
      network: allTransferData.fromNetwork,
      coin: allTransferData.fromCoin,
      amount: allTransferData.amountDecimal.toString(),
    }

    to = {
      label: 'To',
      address: allTransferData.toAddress,
      network: allTransferData.toNetwork,
      coin: allTransferData.toCoin,
      amount: allTransferData.amountDecimal.toString(),
    }
  }

  return (
    <Modal
      onClose={onClose}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.auto}
      role={ROLE.dialog}
      overrides={modalOverrides}
    >
      <ModalHeader>
        <span
          style={{
            fontSize: '32px',
          }}
        >
          Bridge Confirmation
        </span>
      </ModalHeader>

      <ModalBody>
        <InformationDetailArea>
          <InformationDetailItem
            isTrimAddress={true}
            isShowNetworkIcon={false}
            {...from}
          />
          <InformationDetailItem
            isTrimAddress={true}
            isShowNetworkIcon={false}
            {...to}
          />
        </InformationDetailArea>
        <EthereumProgress transactionHash={'9898sss'} />
      </ModalBody>

      <ModalFooter>
        <Button
          overrides={{
            BaseButton: {
              style: {
                width: '100%',
                ...buttonOverrides.BaseButton.style,
              },
            },
          }}
          onClick={onClose}
        >
          Collapse
        </Button>
      </ModalFooter>
    </Modal>
  )
}
