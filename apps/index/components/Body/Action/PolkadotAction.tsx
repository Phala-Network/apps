import {errorMessageAtom} from '@/store/core'
import {LoadingButton} from '@mui/lab'
import {useAtom} from 'jotai'
import {type FC} from 'react'

const PolkadotAction: FC<{onConfirm: () => void; loading: boolean}> = ({
  onConfirm,
  loading,
}) => {
  const [errorMessage] = useAtom(errorMessageAtom)

  return (
    <LoadingButton
      loading={loading}
      size="large"
      fullWidth
      variant="contained"
      disabled={Boolean(errorMessage)}
      onClick={onConfirm}
    >
      {errorMessage ?? 'Transfer'}
    </LoadingButton>
  )
}

export default PolkadotAction
