import {Worker} from '@phala/react-hooks'
import useModalVisible, {ModalKey} from '../../hooks/useModalVisible'
import ActionButton from '../ActionButton'

const buttonEntries: [ModalKey, string][] = [
  ['start', 'Start'],
  ['stop', 'Stop'],
  ['remove', 'Remove'],
]

const WorkerActions = ({
  worker,
  setPubkey,
}: {
  worker: Worker
  setPubkey: (pubkey: string | null) => void
}): JSX.Element => {
  const {open} = useModalVisible()
  const state = worker.miner?.state

  return (
    <>
      {buttonEntries.map(([modalKey, text]) => (
        <ActionButton
          key={modalKey}
          onClick={() => {
            open(modalKey)
            setPubkey(worker.pubkey)
          }}
          disabled={
            (modalKey === 'start' && state !== 'Ready') ||
            (modalKey === 'remove' &&
              state !== 'Ready' &&
              state !== 'MiningCoolingDown') ||
            (modalKey === 'stop' &&
              state !== 'MiningIdle' &&
              state !== 'MiningUnresponsive')
          }
        >
          {text}
        </ActionButton>
      ))}
    </>
  )
}

export default WorkerActions
