import {ApiPromise, Keyring} from '@polkadot/api'
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
import BN from 'bn.js'
import {FC, useCallback, useEffect, useState} from 'react'
import {useAllTransferData} from '../../store'
import {TransactionInfo} from '../../types'
import {InformationDetailItem} from '../InformationDetailItem'
import {transferAssetsKhalaAccounts} from './transfer'
import {getBaseInfo} from './xtransfer'

const bn1e12 = new BN(10).pow(new BN(12))

interface TransferModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
  transactionInfo?: TransactionInfo
}

export const TransferModal: FC<TransferModalProps> = (props) => {
  const {isOpen, onClose, onConfirm} = props
  const allTransferData = useAllTransferData()
  const [khalaApi, setKhalaApi] = useState<ApiPromise>()
  const [, setKaruraApi] = useState<ApiPromise>()

  useEffect(() => {
    getBaseInfo().then(({khalaApi, karuraApi}) => {
      setKhalaApi(khalaApi)
      setKaruraApi(karuraApi)
    })
  }, [])

  const log = (message: string) => {
    // eslint-disable-next-line no-console
    console.log(message)
  }

  const submit = useCallback(() => {
    if (!khalaApi) return

    const keyring = new Keyring({type: 'sr25519'})

    // transferPHAFromKhalaToKarura(
    //   khalaApi,
    //   keyring.addFromAddress(allTransferData.fromAddress),
    //   keyring.addFromAddress(allTransferData.toAddress),
    //   bn1e12.mul(new BN(allTransferData.fromAmount)),
    //   log
    // )

    // 5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY
    const karuraAccount = keyring.addFromUri('//Alice')
    // 5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty
    const khalaAccount = keyring.addFromUri('//Bob')

    transferAssetsKhalaAccounts(
      khalaApi,
      // keyring.addFromAddress(allTransferData.fromAddress),
      karuraAccount,
      // keyring.addFromAddress(allTransferData.toAddress),
      khalaAccount,
      bn1e12.mul(new BN(allTransferData.fromAmount)),
      log
    )

    onConfirm?.()
  }, [allTransferData.fromAmount, khalaApi, onConfirm])

  return (
    <Modal
      onClose={onClose}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
      overrides={{
        Dialog: {
          style: {
            border: '2px solid #AAD829',
            borderRadius: 0,
          },
        },
      }}
    >
      <ModalHeader>Bridge Confirmation</ModalHeader>

      <ModalBody>
        <InformationDetailItem
          label="From"
          address={allTransferData.fromAddress}
          network={allTransferData.fromNetwork}
          coin={allTransferData.fromCoin}
          amount={allTransferData.fromAmount.toString()}
        />

        <InformationDetailItem
          label="To"
          address={allTransferData.toAddress}
          network={allTransferData.toNetwork}
          coin={allTransferData.toCoin}
          amount={allTransferData.fromAmount.toString()}
        />
      </ModalBody>

      <ModalFooter>
        <ModalButton onClick={onClose} kind={ButtonKind.tertiary}>
          Cancel
        </ModalButton>
        <ModalButton onClick={submit}>Submit</ModalButton>
      </ModalFooter>
    </Modal>
  )
}
