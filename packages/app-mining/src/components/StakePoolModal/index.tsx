import {useEffect, useState, VFC} from 'react'
import {Modal, ModalProps} from 'baseui/modal'
import {useSSR} from '@phala/react-hooks'
import {StakePoolsQuery} from '../../hooks/graphql'

// FIXME: should be loadable, but meet some problems when configuring gatsby-plugin-loadable-components-ssr
import DelegateModalBody from './DelegateModalBody'
import ClaimModalBody from './ClaimModalBody'
import WithdrawModalBody from './WithdrawModalBody'
import SetCapModalBody from './SetCapModalBody'
import SetCommissionModalBody from './SetCommissionModalBody'
import AddWorkerModalBody from './AddWorkerModalBody'
import ReclaimAllModalBody from './ReclaimAllModalBody'

export type StakePoolModalKey =
  | 'addWorker'
  | 'setCap'
  | 'claim'
  | 'delegate'
  | 'withdraw'
  | 'setCommission'
  | 'reclaimAll'

const modalKeyMap = {
  delegate: DelegateModalBody,
  claim: ClaimModalBody,
  withdraw: WithdrawModalBody,
  setCap: SetCapModalBody,
  setCommission: SetCommissionModalBody,
  addWorker: AddWorkerModalBody,
  reclaimAll: ReclaimAllModalBody,
}

export type StakePool = StakePoolsQuery['findManyStakePools'][number]

const StakePoolModal: VFC<
  {
    stakePool?:
      | (Pick<StakePool, 'pid'> &
          Partial<
            Pick<
              StakePool,
              | 'releasingStake'
              | 'stakePoolStakers'
              | 'stakePoolWithdrawals'
              | 'cap'
              | 'totalStake'
              | 'commission'
              | 'miners'
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
            borderRadius: 0,
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
