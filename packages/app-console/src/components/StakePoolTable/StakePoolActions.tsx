import {StakePool} from '../../hooks/useStakePools'
import ActionButton from '../ActionButton'
import useModalVisible, {ModalKey} from '../../hooks/useModalVisible'

const buttonEntries: [ModalKey, string][] = [
  ['stakeInfo', 'Stake Info'],
  ['addWorker', 'Add Worker'],
  ['setCap', 'Set Cap'],
  ['claim', 'Claim'],
  ['setPayoutPref', 'Set Payout Pref'],
]

const StakePoolActions: React.FC<{
  stakePool: StakePool
  setPid: (pid: number | null) => void
}> = ({stakePool, setPid}) => {
  const {open} = useModalVisible()

  return (
    <>
      {buttonEntries.map(([modalKey, text]) => (
        <ActionButton
          key={modalKey}
          onClick={() => {
            setPid(stakePool.pid)
            open(modalKey)
          }}
        >
          {text}
        </ActionButton>
      ))}
    </>
  )
}

export default StakePoolActions
