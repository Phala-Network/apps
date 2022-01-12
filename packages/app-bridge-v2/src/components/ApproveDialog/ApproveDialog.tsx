import {ethereums} from '@phala/app-config'
import {
  Button,
  FeeLabel,
  Modal,
  ModalAction,
  ModalActions,
} from '@phala/react-components'
import {
  useErc20Contract,
  useEthereumBridgeApproveFee,
  useEthers,
  useTransactionReceiptQuery,
} from '@phala/react-libs'
import {ethers} from 'ethers'
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

type Props = {
  visible: boolean
  onClose(): void
}

const Content = styled.div`
  font-size: 12px;
  line-height: 14px;
  color: #878787;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
`

const ApproveDialog: React.FC<Props> = (props) => {
  const {visible, onClose} = props
  const {contract} = useErc20Contract()
  const {provider, signer} = useEthers()
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const [approveHash, setApproveHash] = useState('')
  const {data: receipt} = useTransactionReceiptQuery(approveHash)
  const fee = useEthereumBridgeApproveFee()

  const startApprove = async () => {
    try {
      const network = ethereums[provider?.network.chainId as number]

      if (
        contract === undefined ||
        network === undefined ||
        signer === undefined
      ) {
        return
      }

      const contractSigned = contract.connect(signer)

      const approveResult = await contractSigned.functions['approve']?.(
        network.erc20AssetHandler,
        ethers.utils.parseUnits('11451419810', 18)
      )

      setApproveHash(approveResult.hash)
      setSubmitting(true)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (receipt && receipt?.confirmations > 0) {
      setSubmitting(false)
      onClose()
    }
  }, [receipt, onClose])

  return (
    <Modal visible={visible} title="Approve PHA">
      <Content>
        In order for the bridge to move your ERC20 tokens to Khala Network, it
        first needs your approval. This is only required once per ERC20 token!
      </Content>
      <br />
      <FeeLabel label="Fee" fee={(fee?.toFixed(6) || '') + ' ETH'} />

      <ModalActions>
        <ModalAction full>
          <Button onClick={onClose}>Reject</Button>
        </ModalAction>
        <ModalAction full>
          <Button loading={isSubmitting} type="primary" onClick={startApprove}>
            Confirm
          </Button>
        </ModalAction>
      </ModalActions>
    </Modal>
  )
}

export default ApproveDialog
