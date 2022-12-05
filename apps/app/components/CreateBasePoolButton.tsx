import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import {BasePoolKind} from '@/lib/subsquidQuery'
import {FC} from 'react'
import PromiseButton from './PromiseButton'

const CreateBasePoolButton: FC<{kind: BasePoolKind}> = ({kind}) => {
  const api = usePolkadotApi()
  const signAndSend = useSignAndSend()
  const onClick = async () => {
    if (!api) return
    const extrinsic =
      kind === 'StakePool'
        ? api.tx.phalaStakePoolv2.create()
        : api.tx.phalaVault.create()

    return signAndSend(extrinsic)
  }

  return (
    <PromiseButton variant="contained" onClick={onClick}>{`Create ${
      kind === 'StakePool' ? 'Stake Pool' : 'Vault'
    }`}</PromiseButton>
  )
}

export default CreateBasePoolButton
