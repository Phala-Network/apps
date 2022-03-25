import {ethereums} from '@phala/app-config'
import {FeeLabel} from '@phala/react-components'
import {
  useErc20Contract,
  useEthereumBridgeApproveFee,
  useEthers,
  useTransactionReceiptQuery,
} from '@phala/react-libs'
import {Block} from 'baseui/block'
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
import {ethers} from 'ethers'
import React, {useEffect, useState} from 'react'
import {buttonOverrides} from '../../style/buttonOverrides'
import {modalOverrides} from '../../style/modalOverrides'
import {Button} from '../Button'
import {Body, Footer} from './styledComponents'

type Props = {
  visible: boolean
  onClose(): void
}

export const ApproveDialog: React.FC<Props> = (props) => {
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
    <Modal
      closeable={false}
      onClose={onClose}
      isOpen={visible}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
      overrides={modalOverrides}
    >
      <ModalHeader>Approve PHA</ModalHeader>

      <ModalBody>
        <Body>
          In order for the bridge to move your ERC20 tokens to Khala Network, it
          first needs your approval. This is only required once per ERC20 token!
        </Body>
        <Block marginTop={['20px']}>
          <FeeLabel label="Fee" fee={(fee?.toFixed(6) || '') + ' ETH'} />
        </Block>
      </ModalBody>

      <Footer>
        <ModalFooter>
          <Block
            display="flex"
            justifyContent="space-between"
            alignItems="stretch"
          >
            <Block flex={1}>
              <ModalButton
                overrides={{
                  BaseButton: {
                    style: {
                      backgroundColor: '#EEEEEE',
                      width: '100%',
                    },
                  },
                }}
                onClick={onClose}
                kind={ButtonKind.tertiary}
              >
                Reject
              </ModalButton>
            </Block>

            <Block width={['20px']} />

            <Block flex={1}>
              <Button
                overrides={{
                  BaseButton: {
                    style: {
                      width: '100%',
                      ...buttonOverrides.BaseButton.style,
                    },
                  },
                }}
                isLoading={isSubmitting}
                onClick={startApprove}
              >
                Confirm
              </Button>
            </Block>
          </Block>
        </ModalFooter>
      </Footer>
    </Modal>
  )
}
