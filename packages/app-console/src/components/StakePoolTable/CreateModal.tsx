import {useCallback} from 'react'
import {useApiPromise} from '@phala/react-libs/esm/polkadot/hooks/useApiPromise'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import ActionModal from '../ActionModal'
import useStakePools from '../../hooks/useStakePools'

const CreateModal = (props: {onClose: () => void}): JSX.Element => {
  const {refetch} = useStakePools()
  const waitSignAndSend = useWaitSignAndSend()
  const {api} = useApiPromise()
  const onConfirm = useCallback(async () => {
    if (api) {
      return waitSignAndSend(api.tx.phalaStakePool?.create?.()).then(() => {
        refetch()
      })
    }
  }, [api, waitSignAndSend, refetch])

  return (
    <ActionModal
      onClose={props.onClose}
      title="Create"
      subtitle="You will create a new stake pool"
      onConfirm={onConfirm}
    ></ActionModal>
  )
}

export default CreateModal
