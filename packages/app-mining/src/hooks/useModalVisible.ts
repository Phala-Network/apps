import {useAtom, atom} from 'jotai'
import {useCallback, useMemo} from 'react'

const initialState = {
  // Stakepool
  addWorker: false,
  claim: false,
  delegate: false,
  create: false,
  setCap: false,
  setPayoutPref: false,
  stakeInfo: false,
  withdraw: false,

  // Worker
  start: false,
  stop: false,
  remove: false,
  reclaim: false,
}

export type ModalKey = keyof typeof initialState
type SetFn = (key: ModalKey) => void

const modalVisibleAtom = atom(initialState)

const useModalVisible = (): {
  open: SetFn
  close: SetFn
  modalVisible: typeof initialState
  visibleCount: number
} => {
  const [modalVisible, setModalVisible] = useAtom(modalVisibleAtom)
  const open = useCallback<SetFn>(
    (key) =>
      setModalVisible((modalVisible) => ({...modalVisible, [key]: true})),
    [setModalVisible]
  )
  const close = useCallback<SetFn>(
    (key) =>
      setModalVisible((modalVisible) => ({...modalVisible, [key]: false})),
    [setModalVisible]
  )
  const visibleCount = useMemo<number>(
    () => Object.values(modalVisible).filter(Boolean).length,
    [modalVisible]
  )

  return {open, close, modalVisible, visibleCount}
}

export default useModalVisible
