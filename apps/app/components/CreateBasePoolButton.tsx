import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import {BasePoolKind} from '@/lib/subsquidQuery'
import {LoadingButton} from '@mui/lab'
import {FC, useState} from 'react'

const CreateBasePoolButton: FC<{kind: BasePoolKind}> = ({kind}) => {
  const [loading, setLoading] = useState(false)
  const api = usePolkadotApi()
  const signAndSend = useSignAndSend()
  const onClick = () => {
    if (!api) return
    setLoading(true)
    const extrinsic =
      kind === 'StakePool'
        ? api.tx.phalaStakePoolv2.create()
        : api.tx.phalaVault.create()

    signAndSend(extrinsic).finally(() => {
      setLoading(false)
    })
  }

  return (
    <LoadingButton
      loading={loading}
      variant="contained"
      onClick={onClick}
    >{`Create ${kind === 'StakePool' ? 'Stake Pool' : 'Vault'}`}</LoadingButton>
  )
}

export default CreateBasePoolButton
