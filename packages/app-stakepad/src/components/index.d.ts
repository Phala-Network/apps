import type {StakePool} from '@phala/react-hooks'

declare global {
  type StakePoolModalProps = {
    onClose: () => void
    stakePool: StakePool
  }
}
