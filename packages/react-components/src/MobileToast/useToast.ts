import { useContext } from 'react'
import {
  MobileToastContext,
  MobileToastContextValue,
} from './MobileToastContext'

export function useToast(): MobileToastContextValue {
  return useContext(MobileToastContext)
}
