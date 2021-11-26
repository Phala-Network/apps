import {PhalaStakePoolTransactionFeeLabel} from '@phala/react-components'
import {useApiPromise} from '@phala/react-libs'
import {useCallback, useMemo} from 'react'
import useSelfStakePools from '../hooks/useSelfStakePools'
import useWaitSignAndSend from '../hooks/useWaitSignAndSend'
import ActionModal from './ActionModal'

const CreateModal = (props: {onClose: () => void}): JSX.Element => {
  const {refetch} = useSelfStakePools()
  const waitSignAndSend = useWaitSignAndSend()
  const {api} = useApiPromise()
  const action = useMemo(() => {
    if (!api) return

    return api.tx.phalaStakePool?.create?.()
  }, [api])

  const onConfirm = useCallback(async () => {
    if (action) {
      return waitSignAndSend(action).then(() => {
        refetch()
      })
    }
  }, [waitSignAndSend, action, refetch])

  return (
    <ActionModal
      onClose={props.onClose}
      title="Create"
      subtitle="You will create a new stake pool"
      onConfirm={onConfirm}>
      <div>
        <PhalaStakePoolTransactionFeeLabel action={action} />
      </div>
    </ActionModal>
  )
}

export default CreateModal
