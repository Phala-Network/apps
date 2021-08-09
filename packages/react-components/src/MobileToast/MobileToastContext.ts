import { createContext } from 'react'
import { MobileToastProps } from './MobileToast'

export interface MobileToastContextValue {
  toasts: MobileToastProps[]
  toast(props: MobileToastProps): void
}

export const defaultMobileToastContextValue = {
  toasts: [],
  toast: (): null => null,
}

export const MobileToastContext = createContext<MobileToastContextValue>(
  defaultMobileToastContextValue
)
