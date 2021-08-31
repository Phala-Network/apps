import React, {useState} from 'react'
import {MobileToast, MobileToastProps} from './MobileToast'
import {MobileToastContext} from './MobileToastContext'

export const MobileToastContextProvider: React.FC = (props) => {
  const {children} = props
  const [toasts, setToasts] = useState<MobileToastProps[]>([])

  function toast(props: MobileToastProps) {
    setToasts([...toasts, props])
  }

  return (
    <MobileToastContext.Provider value={{toast, toasts}}>
      {children}
      {toasts.map((toast, i) => (
        <MobileToast {...toast} key={`toast-${i}`} />
      ))}
    </MobileToastContext.Provider>
  )
}
