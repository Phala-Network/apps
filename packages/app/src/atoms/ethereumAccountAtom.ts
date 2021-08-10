import { atom } from 'jotai'
import { Account } from '../types/normal'

const ethereumAccountAtom = atom<Account | undefined>(undefined)

export default ethereumAccountAtom
