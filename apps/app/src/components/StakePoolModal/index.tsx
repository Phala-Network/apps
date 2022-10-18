import {useSSR} from '@phala/react-hooks'
import {Modal, ModalProps} from 'baseui/modal'
import {FC, useEffect, useState} from 'react'
import {StakePool} from '../../hooks/subsquid'

// FIXME: should be loadable, but meet some problems when configuring gatsby-plugin-loadable-components-ssr
import AddWorkerModalBody from './AddWorkerModalBody'
import ClaimModalBody from './ClaimModalBody'
import DelegateModalBody from './DelegateModalBody'
import ReclaimAllModalBody from './ReclaimAllModalBody'
import SetCapModalBody from './SetCapModalBody'
import SetCommissionModalBody from './SetCommissionModalBody'
import SetDescriptionModalBody from './SetDescriptionModalBody'
import WithdrawModalBody from './WithdrawModalBody'

export type StakePoolModalKey =
  | 'addWorker'
  | 'setCap'
  | 'claim'
  | 'delegate'
  | 'withdraw'
  | 'setCommission'
  | 'reclaimAll'
  | 'setDescription'

const modalKeyMap = {
  delegate: DelegateModalBody,
  claim: ClaimModalBody,
  withdraw: WithdrawModalBody,
  setCap: SetCapModalBody,
  setCommission: SetCommissionModalBody,
  addWorker: AddWorkerModalBody,
  reclaimAll: ReclaimAllModalBody,
  setDescription: SetDescriptionModalBody,
}

const StakePoolModal: FC<
  {
    stakePool?:
      | (Pick<StakePool, 'pid'> &
          Partial<
            Pick<
              StakePool,
              'releasingStake' | 'capacity' | 'totalStake' | 'commission'
            >
          >)
      | null
    modalKey?: StakePoolModalKey | null
  } & Pick<ModalProps, 'onClose'>
> = ({modalKey, stakePool, onClose}) => {
  const [isOpen, setIsOpen] = useState(Boolean(modalKey))
  const [memorizedModalKey, setMemorizedModalKey] = useState(modalKey)
  const {isBrowser} = useSSR()

  useEffect(() => {
    if (modalKey) {
      setMemorizedModalKey(modalKey)
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [modalKey])

  if (!isBrowser || !stakePool) return null

  const ModalBody = memorizedModalKey && modalKeyMap[memorizedModalKey]

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      overrides={{
        Dialog: {
          style: ({$theme}) => ({
            borderRadius: '4px',
            borderWidth: '2px',
            borderColor: $theme.colors.accent,
            borderStyle: 'solid',
          }),
        },
      }}
    >
      {/* TODO: add suspense wrapper here with loadable modal components */}
      {ModalBody && <ModalBody stakePool={stakePool} onClose={onClose} />}
    </Modal>
  )
}

export default StakePoolModal