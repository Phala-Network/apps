import usePolkadotApi from '@/hooks/usePolkadotApi'
import useSignAndSend from '@/hooks/useSignAndSend'
import type {BasePoolKind} from '@/lib/subsquidQuery'
import type {LoadingButtonProps} from '@mui/lab'
import type {FC} from 'react'
import PromiseButton from '../PromiseButton'

const CreateButton: FC<
  {kind: BasePoolKind} & Omit<LoadingButtonProps, 'onClick'>
> = ({kind, ...props}) => {
  const api = usePolkadotApi()
  const signAndSend = useSignAndSend()
  const onClick = async (): Promise<void> => {
    if (api == null) return
    const extrinsic =
      kind === 'StakePool'
        ? api.tx.phalaStakePoolv2.create()
        : api.tx.phalaVault.create()

    await signAndSend(extrinsic)
  }

  return (
    <PromiseButton
      color={kind === 'StakePool' ? 'primary' : 'secondary'}
      variant="contained"
      onClick={onClick}
      {...props}
    >{`Create ${kind}`}</PromiseButton>
  )
}

export default CreateButton
