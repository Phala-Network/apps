import { useContext } from 'react'
import {
  MobileToastContext,
  MobileToastContextValue,
} from './MobileToastContext'

export default function useToast(): MobileToastContextValue {
  return useContext(MobileToastContext)
}
