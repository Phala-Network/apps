import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import {BasePoolKind} from '@/lib/subsquidQuery'
import {LoadingButtonProps} from '@mui/lab'
import {FC} from 'react'
import PromiseButton from './PromiseButton'

const CreateBasePoolButton: FC<
  {kind: BasePoolKind} & Omit<LoadingButtonProps, 'onClick'>
> = ({kind, ...props}) => {
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
    <PromiseButton variant="contained" onClick={onClick} {...props}>{`Create ${
      kind === 'StakePool' ? 'Stake Pool' : 'Vault'
    }`}</PromiseButton>
  )
}

export default CreateBasePoolButton
