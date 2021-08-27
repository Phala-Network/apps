import useModalVisible, {ModalKey} from '../../hooks/useModalVisible'
import {Worker} from '../../hooks/useWorkers'
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
  const {
    miner: {state},
  } = worker

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
