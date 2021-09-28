import {useTranslation} from '@phala/react-i18n'
import {useApiPromise} from '@phala/react-libs'
import {useCallback} from 'react'
import useSelfStakePools from '../../hooks/useSelfStakePools'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import ActionModal from '../ActionModal'

const CreateModal = (props: {onClose: () => void}): JSX.Element => {
  const {t} = useTranslation()
  const {refetch} = useSelfStakePools()
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
      title={t('mining.create2')}
      subtitle={t('mining.you_will_create_a_new_stake_pool')}
      onConfirm={onConfirm}
    ></ActionModal>
  )
}

export default CreateModal
