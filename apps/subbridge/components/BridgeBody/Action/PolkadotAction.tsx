import {bridgeErrorMessageAtom} from '@/store/bridge'
import {Button} from '@mui/material'
import {useAtom} from 'jotai'
import type {FC} from 'react'

const PolkadotAction: FC<{onConfirm: () => void}> = ({onConfirm}) => {
  const [bridgeErrorMessage] = useAtom(bridgeErrorMessageAtom)

  return (
    <Button
      size="large"
      fullWidth
      variant="contained"
      disabled={Boolean(bridgeErrorMessage)}
      onClick={onConfirm}
    >
      {bridgeErrorMessage ?? 'Transfer'}
    </Button>
  )
}

export default PolkadotAction
