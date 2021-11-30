import {PhalaStakePoolTransactionFeeLabel} from '@phala/react-components'
import {useApiPromise} from '@phala/react-libs'
import Decimal from 'decimal.js'
import {useCallback, useMemo} from 'react'
import styled from 'styled-components'
import useFormat from '../hooks/useFormat'
import useWaitSignAndSend from '../hooks/useWaitSignAndSend'
import ActionModal, {Label, Value} from './ActionModal'
import {StakePoolModalProps} from './StakePoolTable'

const WorkersWrapper = styled.div`
  max-height: 200px;
  overflow: auto;
`

const ReclaimAllModal = (props: StakePoolModalProps): JSX.Element => {
  const {stakePool, onClose, reclaimableWorkers} = props
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()
  const format = useFormat()

  const action = useMemo(() => {
    if (api) {
      return api.tx.utility.batch(
        stakePool.reclaimableWorkers?.map((pubkey) =>
          api.tx.phalaStakePool?.reclaimPoolWorker?.(stakePool.pid, pubkey)
        ) as any
      )
    } else {
      return
    }
  }, [api, stakePool])

  const onConfirm = useCallback(async () => {
    if (action) {
      return waitSignAndSend(action)
    }
  }, [action, waitSignAndSend])

  const reclaimableStake = useMemo<string>(() => {
    if (!reclaimableWorkers?.length) return '-'
    return format(
      reclaimableWorkers.reduce((acc, worker) => {
        return acc.add(worker.stake || new Decimal(0))
      }, new Decimal(0))
    )
  }, [format, reclaimableWorkers])

  return (
    <ActionModal
      onClose={onClose}
      onConfirm={onConfirm}
      title="Reclaim All Worker"
      subtitle="Reclaims the releasing stake of miners in a pool"
      actionsExtra={<PhalaStakePoolTransactionFeeLabel action={action} />}>
      <Label>pid</Label>
      <Value>{stakePool.pid}</Value>
      <Label>Worker PublicKeys</Label>
      <WorkersWrapper>
        {stakePool.reclaimableWorkers?.map((pubkey) => (
          <Value key={pubkey}>{pubkey}</Value>
        ))}
      </WorkersWrapper>
      <Label>Reclaimable Stake</Label>
      <Value>{reclaimableStake}</Value>
    </ActionModal>
  )
}

export default ReclaimAllModal
