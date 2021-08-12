import { Account } from '@phala/app-types'
import { atom } from 'jotai'

export const ethereumAccountAtom = atom<Account | undefined>(undefined)
