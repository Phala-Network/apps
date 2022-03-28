import {Modal, ModalHeader, ROLE, SIZE} from 'baseui/modal'
import {FC, Fragment} from 'react'
import {Ethereum, Karura, Khala, PHA} from '../../config'
import {useAllTransferData} from '../../store'
import {modalOverrides} from '../../style/modalOverrides'
import {TransactionInfo} from '../../types'
import {TransferPHAFromEthereumToKhala} from './transferAction/TransferPHAFromEthereumToKhala'
import {TransferPHAFromKaruraToKhala} from './transferAction/TransferPHAFromKaruraToKhala'
import {TransferPHAFromKhalaToEthereum} from './transferAction/TransferPHAFromKhalaToEthereum'
import {TransferPHAFromKhalaToKarura} from './transferAction/TransferPHAFromKhalaToKarura'

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

  let content = null

  if (isOpen) {
    content = (
      <Fragment>
        {is(PHA, Khala, Ethereum) && (
          <TransferPHAFromKhalaToEthereum onCloseTransfer={onClose} />
        )}
        {is(PHA, Ethereum, Khala) && (
          <TransferPHAFromEthereumToKhala onCloseTransfer={onClose} />
        )}
        {is(PHA, Khala, Karura) && (
          <TransferPHAFromKhalaToKarura onCloseTransfer={onClose} />
        )}
        {is(PHA, Karura, Khala) && (
          <TransferPHAFromKaruraToKhala onCloseTransfer={onClose} />
        )}
      </Fragment>
    )
  }

  return (
    <Modal
      onClose={onClose}
      closeable={false}
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
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

      {content}
    </Modal>
  )
}
